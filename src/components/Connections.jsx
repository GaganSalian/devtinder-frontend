// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";

// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.data));
//     } catch (err) {
//       // Handle Error Case
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;

//   if (connections.length === 0) return <h1> No Connections Found</h1>;

//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } =
//           connection;

//         return (
//           <div
//             key={_id}
//             className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <div>
//               <img
//                 alt="photo"
//                 className="w-20 h-20 rounded-full object-cover"
//                 src={photoUrl}
//               />
//             </div>
//             <div className="text-left mx-4 ">
//               <h2 className="font-bold text-xl">
//                 {firstName + " " + lastName}
//               </h2>
//               {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p>
//             </div>
//             <Link to={"/chat/" + _id}>
//               <button className="btn btn-primary">Chat</button>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Connections;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res.data.data));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch]);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="mt-20 text-center text-2xl font-semibold text-base-content/70">
        No Connections Found
      </h1>
    );

  return (
    <section className="mx-auto mt-12 max-w-4xl space-y-6 px-3">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Your Connections
      </h1>

      {connections.map(
        ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
          <article
            key={_id}
            className="relative flex items-start gap-4 rounded-3xl bg-base-200/60 backdrop-blur-md p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* glow ring on hover */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 blur-md transition-opacity duration-300 group-hover:opacity-70" />

            {/* avatar */}
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-primary/60"
            />

            {/* details */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold leading-tight">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="mt-0.5 text-sm text-base-content/70">
                  {age} • {gender}
                </p>
              )}
              {about && (
                <p className="mt-2 line-clamp-2 text-base-content/80">
                  {about}
                </p>
              )}
            </div>

            {/* chat button */}
            <Link
              to={`/chat/${_id}`}
              className="ml-auto self-center"
            >
              <button className="btn btn-primary btn-sm flex items-center gap-2 hover:scale-105 transition-transform">
                <FaComments /> Chat
              </button>
            </Link>
          </article>
        )
      )}
    </section>
  );
};

export default Connections;
