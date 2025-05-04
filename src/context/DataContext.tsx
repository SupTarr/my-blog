import { createContext, useState, useEffect, ReactNode } from "react";
import { Post } from "../types/Post";

type ContainerProps = {
  children: ReactNode;
};

type ContextType = {
  search: string;
  setSearch(newSearch: string): void;
  posts: Post[];
  setPosts(posts: Post[]): void;
  searchResults: Post[];
  fetchError: string | null;
  isLoading: boolean;
  setIsLoading(isLoading: boolean): void;
};

const ContextState: ContextType = {
  search: "",
  setSearch: () => {},
  posts: [],
  setPosts: () => {},
  searchResults: [],
  fetchError: null,
  isLoading: false,
  setIsLoading: () => {},
};

const DataContext = createContext(ContextState);

export const DataProvider = ({ children }: ContainerProps) => {
  const [posts, setPostsState] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const storedPosts = localStorage.getItem("blogPosts");
      const initialPosts = storedPosts ? JSON.parse(storedPosts) : [];
      setTimeout(() => {
        setPostsState(initialPosts);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to load posts from localStorage:", error);
      setFetchError("Failed to load posts.");
      setPostsState([]);
      setIsLoading(false);
    }
  }, []);

  const setPosts = (newPosts: Post[]) => {
    try {
      setPostsState(newPosts);
      localStorage.setItem("blogPosts", JSON.stringify(newPosts));
      setFetchError(null);
    } catch (error) {
      console.error("Failed to save posts to localStorage:", error);
      setFetchError("Failed to save posts.");
    }
  };

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
        setIsLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
