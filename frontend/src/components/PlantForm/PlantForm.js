import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./PlantForm.css";
import PhotosUploader from "../PhotosUploader/PhotosUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PlantForm = () => {
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [addedImgs, setAddedImgs] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [farmingMethod, setFarmingMethod] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleName = (value) => {
    const cleanedValue = value.replace(/[^a-z,\s]/gi, "");
    // Limit the value to 50 characters
    const truncatedValue = cleanedValue.slice(0, 100);
    setName(truncatedValue);
  };

  const handleFarmingMethod = (value) => {
    setFarmingMethod(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      setError("You must be logged in");
      setIsLoading(false);
      return;
    }

    const plant = {
      name,
      img: addedImgs,
      description,
      category,
      farming_method: farmingMethod,
    };

    const response = await fetch("/api/plants", {
      method: "POST",
      body: JSON.stringify(plant),
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    console.log(json.emptyFields);

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setAddedImgs([]);
      setDescription("");
      setCategory("");
      setFarmingMethod("");

      setError(null);
      setEmptyFields([]);
      console.log("New plant added to database!", json);
    }
    setIsLoading(false);
  };

  const categoryOptions = [
    "Voce",
    "Povrce",
    "Ljekovito",
    "Aromaticno",
    "Zitarice",
  ];

  return (
    <form className="create create-ad-form" onSubmit={handleSubmit}>
      <h1>Dodaj novU biljku u bazu podataka</h1>

      <h2>Ime biljke: </h2>
      <p>Upišite ime biljke na hrvatskom jeziku.</p>
      <input
        type="text"
        onChange={(e) => handleName(e.target.value)}
        value={name}
        className={`ad-form-input ${
          emptyFields.includes("name") ? "error" : ""
        }`}
      />

      <h2>Slika: </h2>
      <p>
        Učitajte 1 sliku profila biljke. Sliku možete dodati pomoću linka ili
        učitati s računala.
      </p>
      <PhotosUploader
        addedImgs={addedImgs}
        onChange={setAddedImgs}
        emptyFields={emptyFields}
      />

      <h2>Opis biljke: </h2>
      <p>Napišite nešto o biljki, neke detaljnije informacije.</p>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`ad-form-input ${
          emptyFields.includes("description") ? "error" : ""
        }`}
      />

      <h2>Vrsta: </h2>
      <p>Odaberite vrstu kojoj biljka pripada. </p>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`ad-form-input ${
          emptyFields.includes("category") ? "error" : ""
        }`}
      >
        <option value="" disabled>
          Odaberi vrstu
        </option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <h2>Način uzgoja: </h2>
      <p>
        Napišite detaljno o načinu uzgoja ove biljke. O plodoredima, vremenu
        sadnje, organskim gnojivima itd.
      </p>
      <div
        className={`quill-container ${
          emptyFields.includes("farming_method") ? "error" : ""
        }`}
      >
        <ReactQuill value={farmingMethod} onChange={handleFarmingMethod} />
      </div>

      <button disabled={isLoading} className="ad-form-button-publish">
        Dodaj biljku
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PlantForm;
