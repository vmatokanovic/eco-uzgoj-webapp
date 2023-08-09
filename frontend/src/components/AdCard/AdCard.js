import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AdCard.css";
import { motion } from "framer-motion";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAdsContext } from "../../hooks/useAdsContext";
import Dialog from "../Dialog/Dialog";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const AdCard = ({ ad }) => {
  const { user } = useAuthContext();
  const { dispatch } = useAdsContext();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const IdAdRef = useRef();

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

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
      const response = await fetch("/api/ads/" + ad._id, {
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
    } else {
      handleDialog("", false);
    }
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Link to={`/ad/${ad._id}`}>
        <div className="ad-card-container">
          <div className="ad-img-container">
            <img src={"http://localhost:3000/uploads/" + ad.img[0]} />
          </div>
          <div className="ad-details-container">
            <div className="text-container">
              <div className="ad-header">
                <h1>{ad.name}</h1>
                {/* WORKING ALI DA VIDE I ADMINI I ONAJ CIJI JE OGLAS */}
                {/* {user &&
                (user.role === "admin" || user.username === ad.seller_name) ? (
                  <div className="ad-icons-container">
                    <Link to={`/ad/edit/${ad._id}`}>
                      <div className="ad-edit-icon">
                        <span className="form-item-icon material-symbols-rounded">
                          edit
                        </span>
                      </div>
                    </Link>

                    <div
                      className="ad-delete-icon"
                      onClick={(e) => handleDelete(e, ad._id)}
                    >
                      <span className="form-item-icon material-symbols-rounded">
                        delete
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )} */}
                {user && user.username === ad.seller_name ? (
                  <div className="ad-icons-container">
                    <Link to={`/ad/edit/${ad._id}`}>
                      <div className="ad-edit-icon">
                        <span className="form-item-icon material-symbols-rounded">
                          edit
                        </span>
                      </div>
                    </Link>

                    <div
                      className="ad-delete-icon"
                      onClick={(e) => handleDelete(e, ad._id)}
                    >
                      <span className="form-item-icon material-symbols-rounded">
                        delete
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="category-box">{ad.category}</div>
              <div
                className="description-text"
                dangerouslySetInnerHTML={{
                  __html: truncateText(ad.description, 295),
                }}
              ></div>
            </div>
            <div className="bottom-text-container">
              <p>
                {formatDistanceToNow(new Date(ad.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <div className="price-box">{ad.price} €</div>
            </div>
          </div>
        </div>
      </Link>
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
    </motion.div>
  );
};

export default AdCard;
