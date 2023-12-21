import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageHome from "./pages/PageHome";
import PageNewPost from "./pages/PageNewPost";
import PagePost from "./pages/PagePost";
import PageAbout from "./pages/PageAbout";
import Page404 from "./pages/Page404";

function App() {
  return (
    <main className="app min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/post" element={<PageNewPost />} />
        <Route path="/post/:id" element={<PagePost />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="*" Component={Page404} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
