// import { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const EditProfile = ({ user }) =>
//  {
    
//     const [firstName, setFirstName] = useState(user.firstName);
//     const [lastName, setLastName] = useState(user.lastName);
//     const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//     const [age, setAge] = useState(user.age || "");
//     const [gender, setGender] = useState(user.gender || "");
//     const [about, setAbout] = useState(user.about || "");
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();
//     const [showToast, setShowToast] = useState(false);
  


//         const saveProfile = async () => {
//           console.log("save button clikked")
//          //Clear Errors
//          setError("");
         
//          try {
//            const res = await axios.patch(
//               BASE_URL + "/profile/edit",
//              {
//                firstName,
//                lastName,
//                photoUrl,
//                age,
//                gender,
//                about,
//              },
//               { withCredentials: true, }
//            );
//            console.log("FULL RESPONSE:", res);

//             console.log("Profile updated:", res?.data?.data);
//             const updatedUser = res.data.data;
//             dispatch(addUser(updatedUser));//if adat is undefined here the changes must be
//             console.log("Profile updated:", updatedUser);
//             setShowToast(true);
//             setTimeout(() => {
//               setShowToast(false);
//            }, 3000);
//           } catch (err) {
          
//             setError(err.response?.data?.error || "Something went wrong");

//          }
//        };

//   return (
//     <>
//       <div className="flex justify-center my-10">
//         <div className="flex justify-center mx-10">
//           <div className="card bg-base-300 w-96 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title justify-center">Edit Profile</h2>
//               <div>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">First Name:</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={firstName}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <label className="form-control w-full max-w-xs my-2">
//                     <div className="label">
//                       <span className="label-text">Last Name:</span>
//                     </div>
//                     <input
//                       type="text"
//                       value={lastName}
//                       className="input input-bordered w-full max-w-xs"
//                       onChange={(e) => setLastName(e.target.value)}
//                     />
//                   </label>
//                   <div className="label">
//                     <span className="label-text">Photo URL :</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={photoUrl}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setPhotoUrl(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">Age:</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={age}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setAge(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">Gender:</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={gender}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setGender(e.target.value)}
//                   />
//                 </label>
//                 <label className="form-control w-full max-w-xs my-2">
//                   <div className="label">
//                     <span className="label-text">About:</span>
//                   </div>
//                   <input
//                     type="text"
//                     value={about}
//                     className="input input-bordered w-full max-w-xs"
//                     onChange={(e) => setAbout(e.target.value)}
//                   />
//                 </label>
//               </div>
//               <p className="text-red-500">{error}</p>
//               <div className="card-actions justify-center m-2">
//                 <button className="btn btn-primary" onClick={saveProfile}>
//                   Save Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <UserCard
//           user={{ firstName, lastName, photoUrl, age, gender, about }}
//         />
//       </div>
//       {showToast && (
//         <div className="toast toast-top toast-center">
//           <div className="alert alert-success">
//             <span>Profile saved successfully.</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default EditProfile;

import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      const updatedUser = res.data.data;
      dispatch(addUser(updatedUser));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start my-10 gap-10">
        <div className="bg-base-300 rounded-xl shadow-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-indigo-400">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Edit Profile
          </h2>

          {/* Input Fields */}
          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered input-primary w-full bg-base-100 text-base-content"
            />
          </label>

          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered input-primary w-full bg-base-100 text-base-content"
            />
          </label>

          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">Photo URL</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered input-primary w-full bg-base-100 text-base-content"
            />
          </label>

          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">Age</span>
            </div>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered input-primary w-full bg-base-100 text-base-content"
            />
          </label>

          {/* Gender Dropdown */}
          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">Gender</span>
            </div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered select-primary w-full bg-base-100 text-base-content"
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="form-control w-full my-3">
            <div className="label">
              <span className="label-text text-base-content">About</span>
            </div>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-bordered input-primary w-full bg-base-100 text-base-content"
            />
          </label>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="text-center mt-6">
            <button
              className="btn btn-primary btn-wide shadow-md hover:shadow-lg transition-all duration-200"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-green-500 text-white shadow-lg">
            <span>✅ Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
