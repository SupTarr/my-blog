import { useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import { format } from "date-fns";
import { Post } from "../types/Post";

const PageNewPost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? Number(idParam) : 0;

  const { posts, setPosts } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setPostTitle("");
      setPostBody("");
      return;
    }

    const postToEdit = posts.find((post) => post.id === id);
    if (!postToEdit) {
      console.warn(`Post with id ${id} not found for editing.`);
      navigate("/");
      return;
    }

    setPostTitle(postToEdit.title);
    setPostBody(postToEdit.body);
  }, [id, posts, navigate]);

  const handleSubmit = (editId: number = 0) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    if (!editId) {
      const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const newPost: Post = {
        id: newId,
        datetime,
        title: postTitle,
        body: postBody,
      };
      setPosts([...posts, newPost]);
    } else {
      const updatedPosts = posts.map((post) =>
        post.id === editId
          ? { ...post, title: postTitle, body: postBody, datetime }
          : post,
      );
      setPosts(updatedPosts);
    }

    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

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
