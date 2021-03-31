import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface ISearchBarContext {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

interface ISearchBarContextProviderProps {
  children: ReactNode;
}

const SearchBarContext = createContext<ISearchBarContext>(undefined!);

export const SearchBarContextProvider = ({
  children,
}: ISearchBarContextProviderProps) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const searchBarContextValue: ISearchBarContext = {
    searchInput,
    setSearchInput,
  };

  return (
    <SearchBarContext.Provider value={searchBarContextValue}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarContext = () => {
  const { searchInput, setSearchInput } = useContext(SearchBarContext);
  return { searchInput, setSearchInput };
};
