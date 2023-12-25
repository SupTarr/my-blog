import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

type PropsType = {
  width: number;
  search: string;
  setSearch(newSearch: string): void;
};

const Layout = ({ width, search, setSearch }: PropsType) => {
  return (
    <div className="app min-h-screen">
      <Header width={width} search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
