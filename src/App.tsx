import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Post } from "./types/Post";
import Layout from "./components/Layout";
import PageHome from "./pages/PageHome";
import PageNewPost from "./pages/PageNewPost";
import PagePost from "./pages/PagePost";
import PageAbout from "./pages/PageAbout";
import Page404 from "./pages/Page404";

function App() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!",
    },
  ]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = () => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost: Post = {
      id,
      datetime,
      title: postTitle,
      body: postBody,
    };
    setPosts((posts) => [...posts, newPost]);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = (id: number) => {
    const postsList = posts.filter((post) => post.id != id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout search={search} setSearch={setSearch} />}
      >
        <Route index element={<PageHome posts={searchResults} />} />
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
            path="/:id"
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
