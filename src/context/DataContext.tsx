import { createContext, useState, useEffect } from "react";
import { Post } from "../types/Post";
import useAxiosFetch from "../hooks/useAxiosFetch";

type ContainerProps = {
  children: JSX.Element;
};

type ContextType = {
  search: string;
  setSearch(newSearch: string): void;
  posts: Post[];
  setPosts(posts: Post[]): void;
  searchResults: Post[];
  fetchError: string;
  isLoading: boolean;
};

const ContextState: ContextType = {
  search: "",
  setSearch: () => {},
  posts: [],
  setPosts: () => {},
  searchResults: [],
  fetchError: "",
  isLoading: false,
};

const DataContext = createContext(ContextState);

export const DataProvider = ({ children }: ContainerProps) => {
  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase()),
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        posts,
        setPosts,
        searchResults,
        fetchError,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
