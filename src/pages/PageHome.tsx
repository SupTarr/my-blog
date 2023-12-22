import { Post as TPost } from "../types/Post";
import Post from "../components/Post";
import { Alert, AlertType } from "../components/Alert";

type PropsType = {
  posts: TPost[];
};

const PageHome = ({ posts }: PropsType) => {
  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      {posts.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      ) : (
        <Alert type={AlertType.Info} message={"No posts to display."} />
      )}
    </main>
  );
};

export default PageHome;
