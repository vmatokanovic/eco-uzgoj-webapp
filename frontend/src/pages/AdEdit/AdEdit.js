import React from "react";
import AdForm from "../../components/AdForm/AdForm";
import AdFormEdit from "../../components/AdFormEdit/AdFormEdit";
import "./AdEdit.css";

const AdEdit = () => {
  return (
    <div className="ad-create-container">
      <AdFormEdit title="UREDI OGLAS" />
    </div>
  );
};

export default AdEdit;
