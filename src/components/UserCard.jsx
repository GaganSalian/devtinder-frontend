// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../utils/feedSlice";


// const UserCard = ({ user }) => {
   
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
//   const dispatch = useDispatch();
//   const handleSendRequest = async (status, userId) => {
//     try {
//       // console.log(`Sending ${status} request for user:`, userId); 
//       const res = await axios.post(
//         BASE_URL+"/request/send/"+status+"/"+userId,
//         {},
//         { withCredentials: true }
//       );
//       // console.log("Response from server:", res.data);
//       dispatch(removeUserFromFeed(userId));
//       console.log("Dispatched removeUserFromFeed with id:", userId);

//     } catch (err) {
//       console.error("Error removing user:", err);
//     }
//   };

//   return (
//     <div className="card bg-base-300 w-96 shadow-xl">
//       <figure>
//         <img src={user.photoUrl} alt="photo" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p>{age + ", " + gender}</p>}
//         <p>{about}</p>
//         <div className="card-actions justify-center my-4">
//           <button
//             className="btn btn-primary"
//             onClick={() => handleSendRequest("ignored", _id)}
//           >
//             Ignore
//           </button>
//           <button
//             className="btn btn-secondary"
//             onClick={() => handleSendRequest("interested", _id)}
//           >
//             Interested
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;


import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { FaTimes, FaHeart } from "react-icons/fa";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      // silence expected 400s (e.g., duplicate request) but log the rest
      const code = err?.response?.status;
      if (code !== 400) {
        console.error("Request error:", err);
      }
    } finally {
      // always remove the card so the feed updates instantly
      dispatch(removeUserFromFeed(_id));
    }
  };

  return (
    <div className="relative w-96 transition-all duration-300 hover:-translate-y-2">
      {/* gradient ring on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 blur-md transition-opacity duration-300 hover:opacity-80"></div>

      <div className="card relative bg-base-200/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
        {/* user image */}
        <figure>
          <img src={photoUrl} alt="user" className="w-full h-56 object-cover" />
        </figure>

        <div className="card-body text-center space-y-2">
          <h2 className="card-title justify-center text-2xl font-semibold">
            {firstName} {lastName}
          </h2>

          {age && gender && (
            <p className="text-sm text-base-content/70">
              {age} &bull; {gender}
            </p>
          )}

          {about && (
            <p className="text-base text-base-content/80 line-clamp-3">
              {about}
            </p>
          )}

          {/* buttons */}
          <div className="card-actions mt-4 justify-center space-x-4">
            <button
              onClick={() => handleSendRequest("ignored")}
              className="btn btn-error btn-outline flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <FaTimes /> Ignore
            </button>

            <button
              onClick={() => handleSendRequest("interested")}
              className="btn btn-success flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <FaHeart /> Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
