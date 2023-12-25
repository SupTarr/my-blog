import { Post as TPost } from "../types/Post";
import Post from "../components/Post";
import { Loading, Size } from "../components/Loading";
import { Alert, AlertType } from "../components/Alert";

type PropsType = {
  posts: TPost[];
  isLoading: boolean;
  fetchError: string;
};

const PageHome = ({ posts, isLoading, fetchError }: PropsType) => {
  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      {isLoading && <Loading size={Size.Large} />}
      {!isLoading && fetchError && (
        <Alert type={AlertType.Error} message={fetchError} />
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Post key={`post-${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <Alert type={AlertType.Info} message={"No posts to display."} />
        ))}
    </main>
  );
};

export default PageHome;
