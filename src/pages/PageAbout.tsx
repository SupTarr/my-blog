const PageAbout = () => {
  return (
    <main className="mx-auto flex w-full max-w-screen-lg flex-col flex-wrap content-center gap-5 p-2">
      <h1 className="mb-2 min-w-96 text-2xl font-semibold">About</h1>
      <p>
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
