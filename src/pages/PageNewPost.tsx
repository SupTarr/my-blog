import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Api from "../api/posts";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import { Post } from "../types/Post";

const PageNewPost = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const id = searchParams.get("id") ? Number(searchParams.get("id")) : 0;

  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  const handleSubmit = async (id: number = 0) => {
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost: Post = {
      id: id ? id : newId,
      datetime,
      title: postTitle,
      body: postBody,
    };
    try {
      const response = await (id
        ? Api.put(`/posts/${id}`, newPost)
        : Api.post("/posts", newPost));
      setPosts(
        id
          ? posts.map((post) => (post.id === id ? { ...response.data } : post))
          : [...posts, response.data],
      );
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`>> error: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    id
      ? (async () => {
          try {
            const response = await Api.get(`/posts/${searchParams.get("id")}`);
            setPostTitle(response.data.title);
            setPostBody(response.data.body);
          } catch (err) {
            console.log(`>> error: ${(err as Error).message}`);
          }
        })()
      : (() => {
          setPostTitle("");
          setPostBody("");
        })();
  }, []);

  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      <h1 className="mb-2 text-2xl font-semibold">
        {id ? "Edit Post" : "New Post"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          id ? handleSubmit(id) : handleSubmit();
        }}
      >
        <label className="form-control">
          <div className="label">
            <span className="label-text">Post Title</span>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered mb-3 w-full text-base"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Post Body</span>
          </div>
          <textarea
            className="textarea textarea-bordered mb-5 w-full text-base"
            placeholder="Body"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-accent">
          Submit
        </button>
      </form>
    </main>
  );
};

export default PageNewPost;
