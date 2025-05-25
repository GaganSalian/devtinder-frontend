// import { Outlet, useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";
// import Footer from "./Footer";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useEffect } from "react";

// const Body = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((store) => store.user);

//   const fetchUser = async () => {
//     if (userData) return;
//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       dispatch(addUser(res.data));
//     } catch (err) {
//       if (err.status === 401) {
//         navigate("/login");
//       }
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <NavBar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };
// export default Body;

import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // ---------------- fetch logged-in user once ----------------
  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err?.status === 401) navigate("/login");
        console.error(err);
      }
    };
    fetchUser();
  }, [dispatch, navigate, userData]);
  // ----------------------------------------------------------

  return (
    <div
      className="flex min-h-screen flex-col 
    "
    >
      {/* 1. NavBar stays at top */}
      <NavBar />

      {/* 2. Route content grows and pushes footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. Footer naturally lands at bottom */}
      <Footer />
    </div>
  );
};

export default Body;
