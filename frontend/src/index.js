import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AdsContextProvider } from "./context/AdContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentsContextProvider } from "./context/CommentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <AdsContextProvider>
          <CommentsContextProvider>
            <App />
          </CommentsContextProvider>
        </AdsContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
