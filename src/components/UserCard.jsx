import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
   // Moved useDispatch outside the render block
  
  // console.log("UserCard received user:", user); // Debugging User Data

  // if (!user) {
  //   console.log("User is undefined, skipping rendering...");
  //   return null;
  // }

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      console.log(`Sending ${status} request for user:`, userId); // Debug log
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Response from server:", res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error removing user:", err);
    }
  };
//"https://via.placeholder.com/150"
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl } alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
