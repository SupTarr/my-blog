import Post from "../components/Post";
import { Loading, Size } from "../components/Loading";
import { Alert, AlertType } from "../components/Alert";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const PageHome = () => {
  const { searchResults, isLoading, fetchError } = useContext(DataContext);

  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      {isLoading && <Loading size={Size.Large} />}
      {!isLoading && fetchError && (
        <Alert type={AlertType.Error} message={fetchError} />
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {searchResults.map((post) => (
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
