import { useReducer, createContext, useContext } from "react";

const giphySearchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        searchUrl: action.payload.searchUrl,
        searchQuery: action.payload.searchQuery,
        explicitRating: action.payload.explicitRating,
        previousSearchQuery: action.payload.previousSearchQuery,
      };
    default:
      throw new Error(`searchBarReducer Error`);
  }
};

const GiphySearchContext: any = createContext(!undefined);

export const GiphySearchContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(giphySearchReducer, {
    searchUrl: "",
    searchQuery: "",
    limit: 20,
    offset: 0,
    explicitRating: "g",
    previousSearchQuery: "",
  });

  const value: any = { state, dispatch };

  return (
    <GiphySearchContext.Provider value={value}>
      {props.children}
    </GiphySearchContext.Provider>
  );
};

export const useGiphySearchContext = () => {
  const { state, dispatch } = useContext(GiphySearchContext);
  return { state, dispatch };
};
