import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="hero min-h-[calc(100vh-120px)] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-4 text-5xl font-bold">404</h1>
          <h2 className="text-4xl font-bold">Not Found</h2>
          <p className="py-6">Something went wrong! Please try again.</p>
          <Link className="link link-primary mt-5 text-center" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
