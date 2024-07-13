import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
  const [user, setuser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setuser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [comment]);
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@ ${user.username}` : `anonymous user`}
          </span>
          <span className="text-gray- text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment && comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberofLikes > 0 &&
              comment.numberofLikes +
                " " +
                (comment.numberofLikes === 1 ? "Like" : "Likes")}
          </p>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.string,
    postId: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    likes: PropTypes.array,
    numberofLikes: PropTypes.number,
  }),
  onLike: PropTypes.func,
};
