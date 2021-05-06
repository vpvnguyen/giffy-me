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

  const [searchInput, setSearchInput] = useState<any>(initialGiphySearchState);
  const [searchUrl, setSearchUrl] = useState<string>(initialSearchUrl);
  const [searchHistory, setSearchHistory] = useState<any>(initialSearchHistory);

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

    const GiphyApi = new GiphyApiModel()
    const url: string = GiphyApi.getSearchUrl(searchInput);

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
  const { searchInput, setSearchInput } = useContext(SearchBarContext);


  return { searchInput, setSearchInput };
};

export const useSearchUrlContext = () => {
  const { searchUrl, setSearchUrl } = useContext(SearchBarContext);

  return { searchUrl, setSearchUrl };
};

export const useSearchHistoryContext = () => {
  const { searchHistory, setSearchHistory } = useContext(SearchBarContext);
  return { searchHistory, setSearchHistory };
};
