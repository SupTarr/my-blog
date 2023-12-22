import { Post } from "../types/Post";
import { useParams, Link } from "react-router-dom";
import { Alert, AlertType } from "../components/Alert";

type PropsType = {
  posts: Post[];
  handleDelete(id: number): void;
};

const PagePost = ({ posts, handleDelete }: PropsType) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="p-2 w-full max-w-screen-lg mx-auto">
      {post ? (
        <>
          <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
          <p className="mb-5 text-xs">{post.datetime}</p>
          <p className="mb-5">{post.body}</p>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(post.id)}
          >
            Delete Post
          </button>
        </>
      ) : (
        <>
          <Alert type={AlertType.Error} message={"Post Not Found"} />
          <Link className="link link-primary mt-5 text-center" to="/">
            Home
          </Link>
        </>
      )}
    </main>
  );
};

export default PagePost;
