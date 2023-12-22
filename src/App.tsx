import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Post } from "./types/Post";
import Header from "./components/Header";
import Footer from "./components/Footer";
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

  const handleDelete = (id: number) => {
    const postsList = posts.filter((post) => post.id != id);
    setPosts(postsList);
    navigate("/");
  };

  return (
    <main className="app min-h-screen">
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<PageHome posts={posts} />} />
        <Route path="/post" element={<PageNewPost />} />
        <Route
          path="/post/:id"
          element={<PagePost posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<PageAbout />} />
        <Route path="*" Component={Page404} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
