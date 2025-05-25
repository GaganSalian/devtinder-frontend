import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("something in feed went wrong",err)
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />  
      </div>
    )
  );
};
export default Feed;

// //user={feed[0]}

// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import { useEffect } from "react";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   console.log("Current feed in component:", feed);
//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if (feed.length > 0) return; // ✅ skip if already loaded
//     try {
//       const res = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       dispatch(addFeed(res?.data?.data || []));
//     } catch (err) {
//       console.error("Something in feed went wrong", err);
//     }
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!Array.isArray(feed)) return null;

//   if (feed.length === 0)
//     return <h1 className="flex justify-center my-10">No new users found!</h1>;

//   return (
//     <div className="flex justify-center my-10">
//       <UserCard  user={feed[0]} />
//     </div>
//   );
// };

// export default Feed;
