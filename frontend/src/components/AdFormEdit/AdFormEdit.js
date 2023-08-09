import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAdsContext } from "../../hooks/useAdsContext";
import PhotosUploader from "../PhotosUploader/PhotosUploader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

const AdFormEdit = ({ title }) => {
  const { user } = useAuthContext();
  const { dispatch } = useAdsContext();
  let navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [addedImgs, setAddedImgs] = useState([]);

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [adInfo, setAdInfo] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch("/api/ads/" + id);
      const json = await response.json();
      console.log(json);
      setName(json.name);
      setAddedImgs(json.img);
      setDescription(json.description);
      setCategory(json.category);
      setPrice(json.price);
      setContactNumber(json.contact_number);
    };

    fetchAd();
  }, [id]);

  const handleName = (value) => {
    const cleanedValue = value.replace(/[^a-zčćšđž0-9,\s]/gi, "");
    // Limit the value to 50 characters
    const truncatedValue = cleanedValue.slice(0, 100);

    // Check if the truncated value is different from the cleaned value
    if (truncatedValue !== cleanedValue) {
      setError("Naslov oglasa može sadržavati maksimalno 100 znakova.");

      // Clear the error message after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      setError(null);
    }

    setName(truncatedValue);
  };

  const handleContactNumber = (value) => {
    // Remove any non-digit characters
    const cleanedValue = value.replace(/\D/g, "");

    // Limit the value to 10 characters
    const truncatedValue = cleanedValue.slice(0, 10);

    // Check if the truncated value is different from the cleaned value
    if (truncatedValue !== cleanedValue) {
      setError("Contact number should be maximum 10 characters");

      // Clear the error message after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      setError(null);
    }

    setContactNumber(truncatedValue);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const toolbarOptions = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"], // Font style options
        [{ list: "ordered" }, { list: "bullet" }], // Other options like links and images
        ["clean"],
      ],
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const ad = {
      name,
      img: addedImgs,
      description,
      category,
      price,
      contact_number: contactNumber,
    };

    const response = await fetch("/api/ads/" + id, {
      method: "PATCH",
      body: JSON.stringify(ad),
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
      setPrice("");
      setContactNumber("");

      setError(null);
      setEmptyFields([]);
      console.log("Advertise is updated!", json);
      //   dispatch({ type: "CREATE_AD", payload: json });
      navigate("/ad/" + id, { replace: true });
    }
  };

  const categoryOptions = [
    "Gnojivo",
    "Travna smjesa",
    "Zaštita i jačanje bilja",
    "Poboljšivač tla",
    "Eko sjeme",
    "Zemlja",
  ];

  return (
    <form className="create create-ad-form" onSubmit={handleSubmit}>
      <h1>{title}</h1>

      <h2>Naslov: </h2>
      <p>
        Naslov ukratko opisuje proizvod koji prodajete. Maksimalno 100 znakova.
      </p>
      <input
        type="text"
        onChange={(e) => handleName(e.target.value)}
        value={name}
        className={`ad-form-input ${
          emptyFields.includes("name") ? "error" : ""
        }`}
      />

      <h2>Fotografije: </h2>
      <p>
        Dodajte fotografije pomoću linka ili učitajte s računala. Maksimalno 5
        fotografija.
      </p>
      <PhotosUploader
        addedImgs={addedImgs}
        onChange={setAddedImgs}
        emptyFields={emptyFields}
      />

      <h2>Opis oglasa: </h2>
      <p>
        Detaljnije opišite što prodajete, pružite što više informacija kupcima.
      </p>
      <div
        className={`quill-container ${
          emptyFields.includes("description") ? "error" : ""
        }`}
      >
        <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          modules={toolbarOptions}
        />
      </div>

      <h2>Kategorija: </h2>
      <p>
        Odaberite jednu od kategorija. Ukoliko nema točne kategorije, odaberite
        onu koja najbliže opisuje vaš artikl.
      </p>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`ad-form-input ${
          emptyFields.includes("category") ? "error" : ""
        }`}
      >
        <option value="" disabled>
          Odaberi kategoriju
        </option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <h2>Kontakt broj: </h2>
      <p>Upišite Vaš broj mobitela. Broj može sadržavati do 10 znakova.</p>
      <input
        type="text"
        onChange={(e) => handleContactNumber(e.target.value)}
        value={contactNumber}
        className={`ad-form-input small ${
          emptyFields.includes("contact_number") ? "error" : ""
        }`}
      />

      <h2>Cijena (€): </h2>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={`ad-form-input small  ${
          emptyFields.includes("price") ? "error" : ""
        }`}
      />

      {contactNumber.length > 10 && (
        <div className="error">
          Contact number should be maximum 10 characters
        </div>
      )}

      <button className="ad-form-button-publish">Objavi oglas</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AdFormEdit;
