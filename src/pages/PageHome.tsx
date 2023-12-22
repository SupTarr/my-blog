import { Post } from "../types/Post";
import { Alert, AlertType } from "../components/Alert";

type PropsType = {
  posts: Post[];
};

const PageHome = ({ posts }: PropsType) => {
  return (
    <main>
      {posts.length ? (
        posts.map((post) => <p>{post.body}</p>)
      ) : (
        <Alert type={AlertType.Info} message={"No posts to display."} />
      )}
    </main>
  );
};

export default PageHome;
