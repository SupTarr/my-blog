import { useEffect, useState, useContext } from "react";
import { Post } from "../types/Post";
import Api from "../api/posts";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { Alert, AlertType } from "../components/Alert";
import DataContext from "../context/DataContext";

const PagePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDelete } = useContext(DataContext);
  const [post, setPost] = useState<Post>({
    id: 0,
    title: "",
    datetime: format(new Date(), "MMMM dd, yyyy pp"),
    body: "",
  });

  useEffect(() => {
    id &&
      (async () => {
        try {
          const response = await Api.get(`/posts/${id}`);
          setPost(response.data);
        } catch (err) {
          console.log(`>> error: ${(err as Error).message}`);
        }
      })();
  }, []);

  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      {post ? (
        <>
          <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
          <p className="mb-5 text-xs">{post.datetime}</p>
          <p className="mb-5">{post.body}</p>
          <button
            className="btn btn-accent max-w-36"
            onClick={() => navigate(`/post?id=${id}`)}
          >
            Edit Post
          </button>
          <button
            className="btn btn-error max-w-36"
            onClick={() => handleDelete(post.id)}
          >
            Delete Post
          </button>
        </>
      ) : (
        <div className="mx-auto flex w-full max-w-screen-lg flex-col flex-wrap content-center">
          <Alert type={AlertType.Error} message={"Post Not Found"} />
          <Link className="link link-primary mt-5 text-center" to="/">
            Home
          </Link>
        </div>
      )}
    </main>
  );
};

export default PagePost;
