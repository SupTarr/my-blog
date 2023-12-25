import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import Menu from "./Menu";
import { useContext } from "react";
import DataContext from "../context/DataContext";

const Header = () => {
  const { width, search, setSearch } = useContext(DataContext);

  return (
    <div className="navbar sticky top-0 z-10 justify-between bg-base-300">
      <div className="navbar-start w-auto md:w-[50%]">
        <Menu />
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          My Blog
        </Link>
        {width < 768 ? (
          <FaMobileAlt />
        ) : width < 992 ? (
          <FaTabletAlt />
        ) : (
          <FaLaptop />
        )}
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-36 md:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
