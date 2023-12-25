import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Post } from "./types/Post";
import Api from "./api/posts";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";
import Layout from "./components/Layout";
import PageHome from "./pages/PageHome";
import PageNewPost from "./pages/PageNewPost";
import PagePost from "./pages/PagePost";
import PageAbout from "./pages/PageAbout";
import Page404 from "./pages/Page404";

function App() {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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
      setPosts((posts) =>
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

  const handleDelete = async (id: number) => {
    try {
      await Api.delete(`/posts/${id}`);
      setPosts((posts) => posts.filter((post) => post.id != id));
      navigate("/");
    } catch (err) {
      console.log(`>> error: ${(err as Error).message}`);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout width={width} search={search} setSearch={setSearch} />}
      >
        <Route
          index
          element={
            <PageHome
              posts={searchResults}
              isLoading={isLoading}
              fetchError={fetchError}
            />
          }
        />
        <Route path="/post">
          <Route
            index
            element={
              <PageNewPost
                postTitle={postTitle}
                postBody={postBody}
                setPostTitle={setPostTitle}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path=":id"
            element={<PagePost posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route path="/about" element={<PageAbout />} />
        <Route path="*" Component={Page404} />
      </Route>
    </Routes>
  );
}

export default App;
