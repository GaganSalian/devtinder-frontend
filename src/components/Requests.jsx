// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";
// import { useEffect,useState} from "react";

// const Requests = () => {
//   const requests = useSelector((store) => store.requests);
//   const dispatch = useDispatch();

//   const reviewRequest = async (status, _id) => {
//     try {
//       const res =await axios.post(
//         BASE_URL + "/request/review/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//     } catch (err) {
//       console.error("request review went wrong",err)
//     }
//   };

//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/requests/received", {
//         withCredentials: true,
//       });

//       dispatch(addRequests(res.data.data));
//     } catch (err) {
//       console.err("request recived went wrong",err)

//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   if (!requests) return;

//   if (requests.length === 0)
//     return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

//   return (
//     <div className="text-center my-10">
//       <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

//       {requests.map((request) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } =
//           request.fromUserId;

//         return (
//           <div
//             key={_id}
//             className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
//           >
//             <div>
//               <img
//                 alt="photo"
//                 className="w-20 h-20 rounded-full"
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
//             <div>
//               <button
//                 className="btn btn-primary mx-2"
//                 onClick={() => reviewRequest("rejected", request._id)}
//               >
//                 Reject
//               </button>
//               <button
//                 className="btn btn-secondary mx-2"
//                 onClick={() => reviewRequest("accepted", request._id)}
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Requests;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  /* ---------- API helpers ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequests(data.data));
      } catch (err) {
        console.error("fetch requests failed", err);
      }
    })();
  }, [dispatch]);

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error("review request failed", err);
    }
  };

  /* ---------- conditional renders ---------- */
  if (!requests) return null;
  if (requests.length === 0)
    return (
      <h1 className="mt-20 text-center text-2xl font-semibold text-base-content/70">
        No Requests Found
      </h1>
    );

  /* ---------- UI ---------- */
  return (
    <section className="mx-auto mt-12 max-w-4xl space-y-6 px-3">
      <h1 className="mb-6 text-center text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Connection Requests
      </h1>

      {requests.map(({ _id: reqId, fromUserId }) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          fromUserId;

        return (
          <article
            key={reqId}
            className="group relative flex items-start gap-4 rounded-3xl bg-base-200/60 backdrop-blur-md p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* hover glow ring */}
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

            {/* action buttons */}
            <div className="ml-auto flex flex-col gap-2 self-center sm:flex-row">
              <button
                onClick={() => reviewRequest("rejected", reqId)}
                className="btn btn-error btn-outline flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FaTimes /> Reject
              </button>

              <button
                onClick={() => reviewRequest("accepted", reqId)}
                className="btn btn-success flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FaCheck /> Accept
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Requests;
