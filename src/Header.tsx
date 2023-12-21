import Menu from "./Menu";

const Header = () => {
  return (
    <div className="navbar sticky top-0 justify-between bg-base-300">
      <div className="navbar-start w-auto md:w-[50%]">
        <Menu />
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">My Blog</a>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-36 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
