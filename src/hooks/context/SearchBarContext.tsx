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
  const [searchInput, setSearchInput] = useState<any>(
    props.initialSearchInputState
  );

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
  const { searchInput, setSearchInput } = useContext(SearchBarContext);
  return { searchInput, setSearchInput };
};
