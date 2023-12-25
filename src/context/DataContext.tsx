import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Post } from "../types/Post";
import Api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

type ContainerProps = {
  children: JSX.Element;
};

type ContextType = {
  width: number;
  search: string;
  setSearch(newSearch: string): void;
  searchResults: Post[];
  fetchError: string;
  isLoading: boolean;
  postTitle: string;
  postBody: string;
  setPostTitle(postTitle: string): void;
  setPostBody(postBody: string): void;
  handleSubmit(id?: number): void;
  handleDelete(id?: number): void;
};

const ContextState: ContextType = {
  width: 0,
  search: "",
  setSearch: () => {},
  searchResults: [],
  fetchError: "",
  isLoading: false,
  postTitle: "",
  postBody: "",
  setPostTitle: () => {},
  setPostBody: () => {},
  handleSubmit: () => {},
  handleDelete: () => {},
};

const DataContext = createContext(ContextState);

export const DataProvider = ({ children }: ContainerProps) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, isLoading, fetchError } = useAxiosFetch(
    "http://localhost:3500/posts",
  );

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");

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

  const handleSubmit = async (id: number = 0) => {
    const newId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost: Post = {
      id: id ? id : newId,
      datetime,
      title: postTitle,
      body: postBody,
    };
    try {
      const response = await (id
        ? Api.put(`/posts/${id}`, newPost)
        : Api.post("/posts", newPost));
      setPosts((posts) =>
        id
          ? posts.map((post) => (post.id === id ? { ...response.data } : post))
          : [...posts, response.data],
      );
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`>> error: ${(err as Error).message}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await Api.delete(`/posts/${id}`);
      setPosts((posts) => posts.filter((post) => post.id != id));
      navigate("/");
    } catch (err) {
      console.log(`>> error: ${(err as Error).message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        postTitle,
        postBody,
        setPostTitle,
        setPostBody,
        handleSubmit,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
