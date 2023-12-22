import { Post as TPost } from "../types/Post";
import { Link } from "react-router-dom";

type PropsType = {
  post: TPost;
};

const Post = ({ post }: PropsType) => {
  return (
    <div className="card w-72 bg-neutral shadow-xl md:min-w-96">
      <div className="card-body">
        <Link to={`/post/${post.id}`}>
          <h2 className="card-title">{post.title}</h2>
          <p className="text-xs">{post.datetime}</p>
        </Link>
        <p>
          {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
        </p>
      </div>
    </div>
  );
};

export default Post;
