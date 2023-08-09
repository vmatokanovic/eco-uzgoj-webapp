import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAdsContext } from "../../hooks/useAdsContext";
import "./AdDetails.css";
import Dialog from "../../components/Dialog/Dialog";

const AdDetails = () => {
  const [adInfo, setAdInfo] = useState(null);
  const [isSold, setIsSold] = useState(false);
  const [sliderData, setSliderData] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Add selectedImageIndex state

  const { id } = useParams();
  const { user } = useAuthContext();
  const { dispatch } = useAdsContext();
  let navigate = useNavigate();

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const IdAdRef = useRef();

  useEffect(() => {
    const fetchAd = async () => {
      const response = await fetch("/api/ads/" + id);
      const json = await response.json();
      console.log(json);
      setAdInfo(json);
      setSliderData("http://localhost:3000/uploads/" + json.img[0]); // Set initial slider data
      setIsSold(json.sold);
    };

    fetchAd();
  }, [id]);

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    handleDialog("Are you sure you want to delete this ad?", true);

    IdAdRef.current = id;
  };

  const areUSureDelete = async (choose) => {
    if (choose) {
      if (!user) {
        return;
      }
      const response = await fetch("/api/ads/" + adInfo._id, {
        method: "DELETE",
        // prettier-ignore
        headers: {
            'Authorization': `Bearer ${user.token}`,
          },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_AD", payload: json });
      }
      handleDialog("", false);
      navigate("/ads/my", { replace: true });
    } else {
      handleDialog("", false);
    }
  };

  const handleMarkSold = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const ad = {
      sold: true,
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

    if (response.ok) {
      console.log("Advertise is updated!", json);
      setIsSold(true);
    }
  };

  const handleMarkActive = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const ad = {
      sold: false,
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

    if (response.ok) {
      console.log("Advertise is updated!", json);
      setIsSold(false);
    }
  };

  const handleClick = (index) => {
    // console.log(index);
    const slider = "http://localhost:3000/uploads/" + adInfo.img[index];
    setSliderData(slider);
    setSelectedImageIndex(index); // Update selectedImageIndex state
  };

  if (!adInfo) return null;

  return (
    <div className="ad-details-page-container">
      <div className="image-and-details-container">
        <div className="image-slider-container">
          <div className="main-image-container">
            <img className="main-image" src={sliderData} alt="Main pic" />
          </div>

          <div className="thumbnail-images-container">
            {adInfo.img &&
              adInfo.img.map((img, index) => (
                <img
                  key={index}
                  src={"http://localhost:3000/uploads/" + img}
                  alt={`Advertise pic ${index}`}
                  onClick={() => handleClick(index)}
                  className={`thumbnail-image ${
                    index === selectedImageIndex ? "selected" : ""
                  }`} // Add 'selected' class if index matches selectedImageIndex
                />
              ))}
          </div>
        </div>
        <div className="ad-fulldetails-container">
          <h1>{adInfo.name}</h1>
          <div className="category-box">{adInfo.category}</div>
          <p
            className="ad-description-text"
            dangerouslySetInnerHTML={{ __html: adInfo.description }}
          ></p>
          <div className="ad-price-container">{adInfo.price} €</div>
        </div>
      </div>
      <div className="side-details-container">
        <div className="seller-details-container">
          <h2>Podaci o prodavaču</h2>
          <div className="seller-details-text-container">
            <p>Korisničko ime:</p>
            <p>{adInfo.seller_name}</p>
          </div>
          <div className="seller-details-text-container">
            <p>Kontakt broj:</p>
            <p>{adInfo.contact_number}</p>
          </div>
        </div>
        {/* WORKING ALI DA VIDE I ADMINI I PRODAVACI
        {user &&
        (user.role === "admin" || user.username === adInfo.seller_name) ? (
          <div className="ad-details-buttons-container">
            {isSold === false ? (
              <button
                className="btn-handle-ad mark-as-sold"
                onClick={handleMarkSold}
              >
                <span className="form-item-icon material-symbols-rounded">
                  price_check
                </span>
                Označi kao prodano
              </button>
            ) : (
              <button
                className="btn-handle-ad mark-as-sold"
                onClick={handleMarkActive}
              >
                <span className="form-item-icon material-symbols-rounded">
                  published_with_changes
                </span>
                Označi kao dostupno
              </button>
            )}
            <Link to={`/ad/edit/${adInfo._id}`}>
              <button className="btn-handle-ad edit-ad-btn">
                <span className="form-item-icon material-symbols-rounded">
                  edit
                </span>
                Uredi oglas
              </button>
            </Link>

            <button
              className="btn-handle-ad delete-ad-btn"
              onClick={(e) => handleDelete(e, adInfo._id)}
            >
              <span className="form-item-icon material-symbols-rounded">
                delete
              </span>
              Obriši oglas
            </button>
          </div>
        ) : (
          <div></div>
        )} */}
        {user &&
        (user.role === "admin" || user.username === adInfo.seller_name) ? (
          <div className="ad-details-buttons-container">
            {isSold === false ? (
              <button
                className="btn-handle-ad mark-as-sold"
                onClick={handleMarkSold}
              >
                <span className="form-item-icon material-symbols-rounded">
                  price_check
                </span>
                Označi kao prodano
              </button>
            ) : (
              <button
                className="btn-handle-ad mark-as-sold"
                onClick={handleMarkActive}
              >
                <span className="form-item-icon material-symbols-rounded">
                  published_with_changes
                </span>
                Označi kao dostupno
              </button>
            )}
            <Link to={`/ad/edit/${adInfo._id}`}>
              <button className="btn-handle-ad edit-ad-btn">
                <span className="form-item-icon material-symbols-rounded">
                  edit
                </span>
                Uredi oglas
              </button>
            </Link>

            <button
              className="btn-handle-ad delete-ad-btn"
              onClick={(e) => handleDelete(e, adInfo._id)}
            >
              <span className="form-item-icon material-symbols-rounded">
                delete
              </span>
              Obriši oglas
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {dialog.isLoading && (
        <Dialog
          onDialog={areUSureDelete}
          message={dialog.message}
          title="Delete"
          icon="delete"
          color="#ff6767"
          hoverColor="#cc5252"
        />
      )}
    </div>
  );
};

export default AdDetails;
