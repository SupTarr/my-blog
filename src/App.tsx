import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";
import PageHome from "./pages/PageHome";
import PageNewPost from "./pages/PageNewPost";
import PagePost from "./pages/PagePost";
import PageAbout from "./pages/PageAbout";
import Page404 from "./pages/Page404";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageHome />} />
          <Route path="/post">
            <Route index element={<PageNewPost />} />
            <Route path=":id" element={<PagePost />} />
          </Route>
          <Route path="/about" element={<PageAbout />} />
          <Route path="*" Component={Page404} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
