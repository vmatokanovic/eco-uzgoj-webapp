import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import DropdownItem from "../DropdownItem";
import logo from "../../assets/logo.png";
import "./NavBar.css";
import { useEffect, useRef, useState } from "react";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [showLinks, setShowLinks] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubmenuPlants, setShowSubmenuPlants] = useState(false);
  const [showSubmenuAds, setShowSubmenuAds] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);
  const [openAds, setOpenAds] = useState(false);
  const [openPlants, setOpenPlants] = useState(false);

  let profileMenuRef = useRef();
  let adsMenuRef = useRef();
  let plantsMenuRef = useRef();

  useEffect(() => {
    if (user) {
      const handler = (e) => {
        if (!adsMenuRef.current.contains(e.target)) {
          setOpenAds(false);
        }
        if (!profileMenuRef.current.contains(e.target)) {
          setOpenProfile(false);
        }
        if (user.role === "admin") {
          if (!plantsMenuRef.current.contains(e.target)) {
            setOpenPlants(false);
          }
        }
      };
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    setOpenProfile(false);
    logout();
  };

  const handleMobileMenu = () => {
    if (!showLinks) {
      setShowLinks(true);
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      setShowLinks(false);

      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = "unset";
    }
  };

  return (
    <nav className="navbar">
      <div className="left-side">
        <Link to="/">
          <img
            className="logo-navbar"
            src={logo}
            alt="Logo, green plant that grow from hand"
          />
        </Link>
      </div>
      <div className="right-side">
        <button
          className={`hamburger-menu-btn ${showLinks ? "opened" : ""}`}
          onClick={() => {
            handleMobileMenu();
            setShowSubmenuPlants(false);
            setShowSubmenuAds(false);
          }}
        >
          <svg
            fill="#2aab59"
            className="hamburger"
            viewBox="0 0 100 100"
            width="100"
          >
            <rect
              className="line top"
              width="80"
              height="10"
              rx="5"
              x="10"
              y="25"
            ></rect>
            <rect
              className="line middle"
              width="80"
              height="10"
              rx="5"
              x="10"
              y="45"
            ></rect>
            <rect
              className="line bottom"
              width="80"
              height="10"
              rx="5"
              x="10"
              y="65"
            ></rect>
          </svg>
        </button>
        {/* <button
          className="navbar-menu-btn"
          onClick={() => {
            handleMobileMenu();
            setShowSubmenuPlants(false);
            setShowSubmenuAds(false);
          }}
        >
          <span className="material-symbols-outlined">
            {showLinks ? "close" : "menu"}
          </span>
        </button> */}
        <ul className={`main-nav-list ${showLinks ? "opened" : ""}`}>
          <li className={` ${windowWidth > 1000 ? "" : "margin-top-1rem"}`}>
            <Link
              className="main-nav-link"
              to="/"
              onClick={() => {
                if (windowWidth < 1000) {
                  handleMobileMenu();
                }
                setShowSubmenu(!showSubmenu);
              }}
            >
              Naslovnica
            </Link>
          </li>

          {!user || (user && user.role !== "admin") ? (
            <li className={` ${windowWidth > 1000 ? "" : "margin-top-1rem"}`}>
              <Link
                className="main-nav-link"
                to="/plants"
                onClick={() => {
                  if (windowWidth < 1000) {
                    handleMobileMenu();
                  }
                }}
              >
                Biljke
              </Link>
            </li>
          ) : (
            <li className={` ${windowWidth > 1000 ? "" : "margin-top-1rem"}`}>
              <div className="menu-container" ref={plantsMenuRef}>
                <div
                  className="ads-menu-trigger"
                  onClick={() => {
                    setOpenPlants(!openPlants);
                    setShowSubmenuPlants(!showSubmenuPlants);
                  }}
                >
                  <Link
                    className={`main-nav-link ${
                      openPlants ? "active" : "inactive"
                    }`}
                  >
                    Biljke
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </Link>
                </div>
                <li>
                  <div
                    className={`sub-menu responsive ${
                      showSubmenuPlants ? "active" : "inactive"
                    }`}
                  >
                    <Link
                      className="main-nav-link"
                      to="/plants"
                      onClick={() => {
                        setShowLinks(!showLinks);
                        handleMobileMenu();
                        setShowSubmenuPlants(false);
                        setShowSubmenuAds(false);
                      }}
                    >
                      Pregledaj
                    </Link>
                    <Link
                      className="main-nav-link"
                      to="/plants/add"
                      onClick={() => {
                        setShowLinks(!showLinks);
                        handleMobileMenu();
                        setShowSubmenuPlants(false);
                        setShowSubmenuAds(false);
                      }}
                    >
                      Dodaj novu
                    </Link>
                  </div>
                </li>
                <div
                  className={`ads-dropdown-menu ${
                    openPlants ? "active" : "inactive"
                  }`}
                >
                  <ul>
                    <Link
                      to="/plants"
                      onClick={() => {
                        setOpenPlants(false);
                      }}
                    >
                      <DropdownItem icon="view_list" text={"Pregledaj"} />
                    </Link>
                    <Link
                      to="/plants/add"
                      onClick={() => {
                        setOpenPlants(false);
                      }}
                    >
                      <DropdownItem icon="library_add" text={"Dodaj novu"} />
                    </Link>
                  </ul>
                </div>
              </div>
            </li>
          )}
          {user ? (
            <li className={` ${windowWidth > 1000 ? "" : "margin-top-1rem"}`}>
              {user && (
                <div className="menu-container" ref={adsMenuRef}>
                  <div
                    className="ads-menu-trigger"
                    onClick={() => {
                      setOpenAds(!openAds);
                      setShowSubmenuAds(!showSubmenuAds);
                    }}
                  >
                    <Link
                      className={`main-nav-link ${
                        openAds ? "active" : "inactive"
                      }`}
                    >
                      Oglasi
                      <span className="material-symbols-outlined">
                        expand_more
                      </span>
                    </Link>
                  </div>
                  <li>
                    <div
                      className={`sub-menu responsive ${
                        showSubmenuAds ? "active" : "inactive"
                      }`}
                    >
                      <Link
                        className="main-nav-link"
                        to="/ads"
                        onClick={() => {
                          setShowLinks(!showLinks);
                          handleMobileMenu();
                          setShowSubmenuPlants(false);
                          setShowSubmenuAds(false);
                        }}
                      >
                        Pregledaj
                      </Link>
                      <Link
                        className="main-nav-link"
                        to="/ads/my"
                        onClick={() => {
                          setShowLinks(!showLinks);
                          handleMobileMenu();
                          setShowSubmenuPlants(false);
                          setShowSubmenuAds(false);
                        }}
                      >
                        Moji oglasi
                      </Link>
                      <Link
                        className="main-nav-link"
                        to="/ads/add"
                        onClick={() => {
                          setShowLinks(!showLinks);
                          handleMobileMenu();
                          setShowSubmenuPlants(false);
                          setShowSubmenuAds(false);
                        }}
                      >
                        Dodaj novi oglas
                      </Link>
                    </div>
                  </li>
                  <div
                    className={`ads-dropdown-menu ${
                      openAds ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <Link
                        to="/ads"
                        onClick={() => {
                          setOpenAds(false);
                        }}
                      >
                        <DropdownItem icon="view_list" text={"Svi oglasi"} />
                      </Link>
                      <Link
                        to="/ads/my"
                        onClick={() => {
                          setOpenAds(false);
                        }}
                      >
                        <DropdownItem
                          icon="library_books"
                          text={"Moji oglasi"}
                        />
                      </Link>
                      <Link
                        to="/ads/add"
                        onClick={() => {
                          setOpenAds(false);
                        }}
                      >
                        <DropdownItem icon="library_add" text={"Dodaj oglas"} />
                      </Link>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ) : (
            <li className={` ${windowWidth > 1000 ? "" : "margin-top-1rem"}`}>
              <Link
                className="main-nav-link"
                to="/ads"
                onClick={() => {
                  if (windowWidth < 1000) {
                    handleMobileMenu();
                  }
                }}
              >
                Oglasi
              </Link>
            </li>
          )}

          {!user && (
            <div className="login-register-btns-container">
              <li>
                <Link
                  className={` ${
                    windowWidth > 1000
                      ? "main-nav-link nav-login"
                      : "main-nav-link margin-top-1rem"
                  }`}
                  to="/login"
                  onClick={() => {
                    if (windowWidth < 1000) {
                      handleMobileMenu();
                    }
                  }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className={` ${
                    windowWidth > 1000
                      ? "main-nav-link nav-cta"
                      : "main-nav-link margin-top-1rem"
                  }`}
                  to="/register"
                  onClick={() => {
                    if (windowWidth < 1000) {
                      handleMobileMenu();
                    }
                  }}
                >
                  Register
                </Link>
              </li>
            </div>
          )}

          {user && (
            <div className="menu-container" ref={profileMenuRef}>
              {windowWidth > 1000 ? (
                <div>
                  <div
                    className={`menu-trigger ${
                      openProfile ? "active" : "inactive"
                    }`}
                    onClick={() => setOpenProfile(!openProfile)}
                  >
                    <span class="material-symbols-outlined">
                      account_circle
                    </span>
                  </div>
                  <div
                    className={`dropdown-menu ${
                      openProfile ? "active" : "inactive"
                    }`}
                  >
                    <h3>{user.username}</h3>
                    <ul>
                      <div onClick={handleClick}>
                        <DropdownItem icon="logout" text={"Odjava"} />
                      </div>
                    </ul>
                  </div>
                </div>
              ) : (
                <li className="margin-top-1rem">
                  <Link
                    onClick={() => {
                      handleClick();
                      handleMobileMenu();
                    }}
                    className="main-nav-link"
                    to="/login"
                  >
                    Odjavi se
                  </Link>
                </li>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
