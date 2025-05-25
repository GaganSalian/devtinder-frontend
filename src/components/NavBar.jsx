import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { FaUser, FaSignOutAlt, FaStar, FaUsers, FaEnvelope } from "react-icons/fa";
import React, { useRef, useState, useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Ref and state to measure welcome text width
  const welcomeRef = useRef(null);
  const [welcomeWidth, setWelcomeWidth] = useState(0);

  useEffect(() => {
    if (welcomeRef.current) {
      setWelcomeWidth(welcomeRef.current.offsetWidth);
    }
  }, [user?.firstName]);

  return (
    <div className="navbar bg-base-100 bg-opacity-70 backdrop-blur-md shadow-md sticky top-0 z-50 px-4 flex justify-between">
      {/* Left: Logo */}
      <div className="flex-1 min-w-0">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold tracking-wide text-primary hover:scale-105 transition-transform whitespace-nowrap"
        >
          👩‍💻 DevTinder
        </Link>
      </div>

      {/* Right: Welcome text + dropdown */}
      {user && (
        <div className="flex-none flex items-center gap-3 min-w-0 relative">
          {/* Wrap welcome text and avatar in a container with relative positioning */}
          <div className="relative flex items-center gap-3">
            <span
              ref={welcomeRef}
              className="text-sm font-medium hidden sm:block truncate max-w-xs"
            >
              Welcome, <span className="font-bold text-primary">{user.firstName}</span>
            </span>

            <div className="dropdown relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle avatar border-2 border-primary hover:scale-105 transition-transform"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img alt="user" src={user.photoUrl} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1]
                  p-2 ring-1 ring-black/10 bg-base-100 rounded-box
                  w-56 max-w-[calc(100vw-2rem)] overflow-auto space-y-1"
                style={{
                  left: 0,
                  right: "auto",
                  minWidth: "max-content",
                  transform: `translateX(calc(-100% + ${welcomeWidth}px))`,
                }}
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser /> Profile <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="flex items-center gap-2">
                    <FaUsers /> Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="flex items-center gap-2">
                    <FaEnvelope /> Requests
                  </Link>
                </li>
                <li>
                  <Link to="/premium" className="flex items-center gap-2">
                    <FaStar /> Premium
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout} className="flex items-center gap-2 text-error cursor-pointer">
                    <FaSignOutAlt /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
