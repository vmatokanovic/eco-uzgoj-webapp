import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({ addedImgs, onChange, emptyFields }) => {
  const [imgLink, setImgLink] = useState("");
  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  //   //WORKING but doesn't handle error
  //   const addPhotoByLink = async (e) => {
  //     e.preventDefault();
  //     const { data: filename } = await axios.post("/upload-by-link", {
  //       link: imgLink,
  //     });
  //     onChange((prev) => {
  //       return [...prev, filename];
  //     });
  //     setImgLink("");
  //   };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: imgLink,
      });
      onChange((prev) => [...prev, filename]);
      setImgLink("");
    } catch (error) {
      alert("Link je neispravan ili nije slika!");
      console.error("Failed to upload image:", error);
      // Handle the error in the way you prefer (e.g., show an error message)
    }
  };

  return (
    <div>
      <div className="img-add-form">
        <input
          type="text"
          onChange={(e) => setImgLink(e.target.value)}
          value={imgLink}
          className={`ad-form-input ${
            emptyFields.includes("img") ? "error" : ""
          }`}
        />
        <button className="add-img-button" onClick={addPhotoByLink}>
          Dodaj&nbsp;sliku
        </button>
      </div>

      <div className="uploaded-images-container">
        {addedImgs.length > 0 &&
          addedImgs.map((link) => (
            <div key={link}>
              <img
                className="uploaded-images-thumbnail"
                height="120px"
                width="120px"
                src={"http://localhost:3000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
        <label
          className={`upload-img-button ${
            emptyFields.includes("img") ? "error" : ""
          }`}
        >
          <input
            className="hidden"
            type="file"
            multiple
            onChange={uploadPhoto}
          />
          <span className="material-symbols-outlined">upload</span>
          Učitaj
        </label>
      </div>
    </div>
  );
};

export default PhotosUploader;
