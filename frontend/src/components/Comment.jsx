import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Comment({ comment }) {
  const [user, setuser] = useState({});
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
    like: PropTypes.array,
  }),
};
