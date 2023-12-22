type PropsType = {
  postTitle: string;
  postBody: string;
  setPostTitle(postTitle: string): void;
  setPostBody(postBody: string): void;
  handleSubmit(): void;
};

const PageNewPost = ({
  postTitle,
  postBody,
  setPostTitle,
  setPostBody,
  handleSubmit,
}: PropsType) => {
  return (
    <main className="mx-auto flex w-full max-w-screen-lg flex-col flex-wrap content-center gap-5 p-2">
      <h1 className="mb-2 w-72 text-2xl font-semibold md:min-w-96">New Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
