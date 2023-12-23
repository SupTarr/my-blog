import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Api from "../api/posts";

type PropsType = {
  postTitle: string;
  postBody: string;
  setPostTitle(postTitle: string): void;
  setPostBody(postBody: string): void;
  handleSubmit(id?: number): void;
};

const PageNewPost = ({
  postTitle,
  postBody,
  setPostTitle,
  setPostBody,
  handleSubmit,
}: PropsType) => {
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    searchParams.get("id")
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
      <h1 className="mb-2 text-2xl font-semibold">New Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchParams.get("id")
            ? handleSubmit(Number(searchParams.get("id")))
            : handleSubmit();
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
