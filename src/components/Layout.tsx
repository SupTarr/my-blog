import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type PropsType = {
  search: string;
  setSearch(newSearch: string): void;
};

const Layout = ({ search, setSearch }: PropsType) => {
  return (
    <div className="app min-h-screen">
      <Header search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
