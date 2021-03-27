import { useEffect, useReducer } from "react";

const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, loading: true, error: false };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      throw new Error("dataFetchReducer error: state, action");
  }
};

export const useDataFetcher = (apiMethod: any, initialData = null) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  });

  useEffect(() => {
    let runTask = true;

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });

      try {
        const response = await apiMethod();
        if (runTask) dispatch({ type: FETCH_SUCCESS, payload: response });
      } catch (error) {
        if (runTask) dispatch({ type: FETCH_FAILURE });
      }
    };

    fetchData();

    return () => {
      runTask = false;
    };
  }, []);

  return { ...state };
};
