const Menu = () => {
  return (
    <>
      <div className="dropdown md:hidden">
        <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Post</a>
          </li>
          <li>
            <a>About</a>
          </li>
        </ul>
      </div>
      <ul tabIndex={0} className="menu menu-horizontal hidden px-1 md:flex">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Post</a>
        </li>
        <li>
          <a>About</a>
        </li>
      </ul>
    </>
  );
};

export default Menu;
