import { useEffect, useState, useContext } from "react";
import { Post } from "../types/Post";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, AlertType } from "../components/Alert";
import DataContext from "../context/DataContext";
import { Loading, Size } from "../components/Loading";

const PagePost = () => {
  const { isLoading, setIsLoading } = useContext(DataContext);
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const id = idParam ? Number(idParam) : 0;

  const { posts, setPosts } = useContext(DataContext);
  const [post, setPost] = useState<Post | null>(null);
  const [postNotFound, setPostNotFound] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (!id) {
      setPost(null);
      setPostNotFound(true);
      return;
    }

    const foundPost = posts.find((p) => p.id === id);
    if (!foundPost) {
      setPost(null);
      setPostNotFound(true);
      return;
    }

    setTimeout(() => {
      setPost(foundPost);
      setPostNotFound(false);
      setIsLoading(false);
    }, 1000);
  }, [id, posts, setIsLoading]);

  const handleDelete = (postId: number) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    navigate("/");
  };

  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      {isLoading && <Loading size={Size.Large} />}
      {post && !isLoading ? (
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
      ) : postNotFound ? (
        <div className="mx-auto flex w-full max-w-screen-lg flex-col flex-wrap content-center">
          <Alert type={AlertType.Error} message={"Post Not Found"} />
          <Link className="link link-primary mt-5 text-center" to="/">
            Home
          </Link>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </main>
  );
};

export default PagePost;
