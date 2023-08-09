import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Ads from "./pages/Ads/Ads";
import Plants from "./pages/Plants/Plants";
import AdDetails from "./pages/AdDetails/AdDetails";
import AdCreate from "./pages/AdCreate/AdCreate";
import AdEdit from "./pages/AdEdit/AdEdit";
import NavBar from "./components/NavBar/NavBar";
import AdsMy from "./pages/AdsMy/AdsMy";
import PlantCreate from "./pages/PlantCreate/PlantCreate";
import PlantDetails from "./pages/PlantDetails/PlantDetails";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/ads" element={<Ads />} />
            <Route
              path="/ads/my"
              element={user ? <AdsMy /> : <Navigate to="/login" />}
            />
            <Route
              path="/ads/add"
              element={user ? <AdCreate /> : <Navigate to="/login" />}
            />
            <Route path="/ad/:id" element={<AdDetails />} />
            <Route path="/ad/edit/:id" element={<AdEdit />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/plant/:id" element={<PlantDetails />} />
            <Route
              path="/plants/add"
              element={
                user && user.role === "admin" ? (
                  <PlantCreate />
                ) : (
                  <Navigate to="/plants" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
