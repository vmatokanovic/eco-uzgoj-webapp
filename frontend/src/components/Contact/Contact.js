import React, { useState, useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";

import Lottie from "react-lottie";
import lottieData from "../../assets/email_sent.json";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        "service_otva71x",
        "template_tdkpnhs",
        {
          from_name: form.name,
          to_name: "Valentin",
          from_email: form.email,
          to_email: "matokanovic121@gmail.com",
          message: form.message,
        },
        "Fdb1ja80EbQqfk-hW"
      )
      .then(
        () => {
          setLoading(false);
          alert("Hvala na poruci! Odgovorit ćemo u što kraćem roku");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Dogodila se greška!");
        }
      );
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="contact-section-container">
      <div className="left-side">
        <h1>Kontakt</h1>
        <p>
          Pošaljite nam poruku ukoliko imate prijedloge ili bilo kakva pitanja
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <label>
            <span>Vaše ime</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Unesite Vaše ime"
            />
          </label>
          <label>
            <span>Vaš e-mail</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Unesite Vaš e-mail"
            />
          </label>
          <label>
            <span>Poruka</span>
            <textarea
              rows="12"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Unesite Vašu poruku"
            />
          </label>
          <button className="send-btn" type="submit">
            {loading ? "Slanje..." : "Pošalji"}
          </button>
        </form>
      </div>
      <div className="right-side">
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          isStopped={false}
          isPaused={false}
        />
      </div>
    </div>
  );
};

export default Contact;
