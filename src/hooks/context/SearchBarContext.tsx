import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { GiphyApiModel } from "../../services/giphy.api";

export interface ISearchBarContext {
  searchInput: any;
  setSearchInput: Dispatch<SetStateAction<string>>;
  searchUrl: string;
  setSearchUrl: Dispatch<SetStateAction<string>>;
  searchHistory: any;
  setSearchHistory: Dispatch<SetStateAction<string>>;
}

interface ISearchBarContextProviderProps {
  children: ReactNode;
}

const initialGiphySearchState = {
  searchQuery: "",
  limit: 20,
  offset: 0,
  explicitRating: "g",
};

const initialSearchUrl: string = "";

const initialSearchHistory: any = {
  searchQuery: "",
};

const SearchBarContext = createContext<ISearchBarContext>(undefined!);

export const SearchBarContextProvider = (
  props: ISearchBarContextProviderProps
) => {
  console.log("SearchBarContextProvider");

  const [searchInput, setSearchInput] = useState<any>(initialGiphySearchState);
  const [searchUrl, setSearchUrl] = useState<string>(initialSearchUrl);
  const [searchHistory, setSearchHistory] = useState<any>(initialSearchHistory);

  console.log("searchInput", searchInput);

  const updateSearchInput = (event: any) => {
    console.log("handleChangeSearchInput", event.target.value);

    setSearchInput({
      ...searchInput,
      [event.target.name]: event.target.value,
    });
  };

  const resetSearchQuery = () => {
    setSearchInput({ ...searchInput, searchQuery: "" });
  };

  const submitSearch = () => {
    console.log("handleClickSearchButton searchInput", searchInput);

    const url: string = GiphyApiModel.getSearchUrl(searchInput);

    console.log("handleClickSearchButton url", url);
    setSearchUrl(url);
    resetSearchQuery();

    // set previous search query
    setSearchHistory({
      ...searchHistory,
      searchQuery: searchInput.searchQuery,
    });
  };

  const searchBarContextValue: ISearchBarContext = {
    searchInput,
    setSearchInput,
    searchUrl,
    setSearchUrl,
    searchHistory,
    setSearchHistory,
  };

  return (
    <SearchBarContext.Provider value={searchBarContextValue}>
      {props.children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarContext = () => {
  console.log("useSearchBarContext");
  const { searchInput, setSearchInput } = useContext(SearchBarContext);

  console.log("searchInput", searchInput);

  return { searchInput, setSearchInput };
};

export const useSearchUrlContext = () => {
  console.log("useSearchUrlContext");
  const { searchUrl, setSearchUrl } = useContext(SearchBarContext);

  return { searchUrl, setSearchUrl };
};

export const useSearchHistoryContext = () => {
  console.log("useSearchHistoryContext");
  const { searchHistory, setSearchHistory } = useContext(SearchBarContext);
  return { searchHistory, setSearchHistory };
};
