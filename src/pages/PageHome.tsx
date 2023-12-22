import { Post as TPost } from "../types/Post";
import Post from "../components/Post";
import { Alert, AlertType } from "../components/Alert";

type PropsType = {
  posts: TPost[];
};

const PageHome = ({ posts }: PropsType) => {
  return (
    <main className="flex flex-col flex-wrap content-center gap-5 p-2">
      {posts.length ? (
        posts.map((post) => <Post post={post} />)
      ) : (
        <Alert type={AlertType.Info} message={"No posts to display."} />
      )}
    </main>
  );
};

export default PageHome;
