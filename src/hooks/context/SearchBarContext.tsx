import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface ISearchBarContext {
  searchInput: any;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

interface ISearchBarContextProviderProps {
  children: ReactNode;
  initialSearchInputState: any;
}

const SearchBarContext = createContext<ISearchBarContext>(undefined!);

export const SearchBarContextProvider = (
  props: ISearchBarContextProviderProps
) => {
  console.log("SearchBarContextProvider");
  console.log("props.initialSearchInputState", props.initialSearchInputState);

  const [searchInput, setSearchInput] = useState<any>(
    props.initialSearchInputState
  );

  console.log("searchInput", searchInput);

  const searchBarContextValue: ISearchBarContext = {
    searchInput,
    setSearchInput,
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
