const PageAbout = () => {
  return (
    <main className="mx-auto flex w-full flex-col flex-wrap gap-5 p-2 md:w-9/12 lg:w-7/12">
      <h1 className="mb-2 w-72 text-2xl font-semibold md:min-w-96">About</h1>
      <p className="w-72 md:min-w-96">
        This blog app is a project in the{" "}
        <a
          className="link"
          href="https://www.youtube.com/watch?v=RVFAyFWO4go"
          target="_blank"
        >
          Learn React tutorial series
        </a>
        .
      </p>
    </main>
  );
};

export default PageAbout;
