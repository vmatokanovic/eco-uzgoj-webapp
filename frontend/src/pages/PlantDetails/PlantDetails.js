import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./PlantDetails.css";
import Comment from "../../components/Comment/Comment";
import { useCommentsContext } from "../../hooks/useCommentsContext";
import CommentForm from "../../components/CommentForm/CommentForm";

const PlantDetails = () => {
  const { user } = useAuthContext();
  const { comments, dispatch } = useCommentsContext();

  const [plantInfo, setPlantInfo] = useState(null);
  const [obj, setObj] = useState({});

  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPlant = async () => {
      const response = await fetch("/api/plants/" + id);
      const json = await response.json();
      console.log(json);
      setPlantInfo(json);
    };

    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${id}/comments`);
      const json = await response.json();
      console.log(json);
      setObj(json);

      if (response.ok) {
        dispatch({ type: "SET_COMMENTS", payload: json });
      }
    };

    fetchPlant();
    fetchComments();
  }, [id, dispatch]);

  if (!plantInfo) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const createdComment = {
      plantId: id,
      username: user.username,
      comment,
    };

    const response = await fetch(`/api/comments/${id}/createComment`, {
      method: "POST",
      body: JSON.stringify(createdComment),
      headers: {
        "Content-Type": "application/json",
        // prettier-ignore
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setComment("");
      setError(null);
      console.log("New comment added!", json);
      dispatch({ type: "CREATE_COMMENT", payload: json });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!user) {
  //     setError("You must be logged in");
  //     return;
  //   }

  //   const ad = {
  //     name,
  //     img: addedImgs,
  //     description,
  //     category,
  //     price,
  //     contact_number: contactNumber,
  //   };

  //   const response = await fetch("/api/ads", {
  //     method: "POST",
  //     body: JSON.stringify(ad),
  //     headers: {
  //       "Content-Type": "application/json",
  //       // prettier-ignore
  //       'Authorization': `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();
  //   console.log(json.emptyFields);

  //   if (!response.ok) {
  //     setError(json.error);
  //     setEmptyFields(json.emptyFields);
  //   }

  //   if (response.ok) {
  //     setName("");
  //     setAddedImgs([]);
  //     setDescription("");
  //     setCategory("");
  //     setPrice("");
  //     setContactNumber("");

  //     setError(null);
  //     setEmptyFields([]);
  //     console.log("New advertise added!", json);
  //     dispatch({ type: "CREATE_AD", payload: json });
  //   }
  // };

  return (
    <div>
      <div className="plant-details-page-container">
        <div className="plant-name-container">{plantInfo.name}</div>
        <div className="plant-image-description-container">
          <div className="plant-image-container">
            <img
              src={"http://localhost:3000/uploads/" + plantInfo.img}
              alt={`${plantInfo.name}`}
            />
          </div>
          <div className="plant-description-container">
            <div className="plant-category">{plantInfo.category}</div>
            <div className="plant-description-text">
              {plantInfo.description}
            </div>
          </div>
        </div>

        <div
          className="plant-farming-method-container"
          dangerouslySetInnerHTML={{ __html: plantInfo.farming_method }}
        ></div>
      </div>
      <div className="comments-container">
        <div className="comments-section-container">
          {user ? (
            <CommentForm
              title="Post comment"
              placeholder="Write a comment..."
              submitHandler={submitHandler}
              value={comment}
              setComment={(comment) => setComment(comment)}
            />
          ) : (
            <div className="comments-disabled-container">
              Komentari su dopušteni samo prijavljenim korisnicima.{" "}
              <Link className="register-link" to="/login">
                Prijavite se{" "}
              </Link>
              u svoj korisnički račun ili se{" "}
              <Link className="register-link" to="/register">
                registrirajte.
              </Link>
            </div>
          )}
          {comments?.length > 0 ? (
            <div className="comments-section">
              {comments?.length >= 0 &&
                comments?.map((comment) => (
                  <Comment key={comment?._id} comment={comment} />
                ))}
            </div>
          ) : (
            <div className="comments-disabled-container no-comments">
              Trenutno nema komentara vezanih za ovu biljku
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
