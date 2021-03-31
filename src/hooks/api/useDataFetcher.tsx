import axios from "axios";
import { useEffect, useReducer, useState } from "react";

interface IfetchStatus {
  INIT: "FETCH_INIT";
  SUCCESS: "FETCH_SUCCESS";
  FAILURE: "FETCH_FAILURE";
}

interface IdataFetcherReducer {
  type?: string;
  payload?: any;
}

const fetchStatus: IfetchStatus = {
  INIT: "FETCH_INIT",
  SUCCESS: "FETCH_SUCCESS",
  FAILURE: "FETCH_FAILURE",
};

const dataFetchReducer = (state: any, action: IdataFetcherReducer) => {
  switch (action.type) {
    case fetchStatus.INIT:
      return { ...state, loading: true, error: false };
    case fetchStatus.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        response: action.payload,
      };
    case fetchStatus.FAILURE:
      return { ...state, loading: false, error: true };
    default:
      throw new Error("dataFetchReducer error: state, action");
  }
};

export const useDataFetcher = (initialUrl: string, initialData = null) => {
  const [url, setUrl] = useState<string>(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    response: initialData,
  });

  useEffect(() => {
    let runTask = true;

    const fetchData = async () => {
      dispatch({ type: fetchStatus.INIT });

      try {
        const response = await axios.get(url);
        if (runTask) dispatch({ type: fetchStatus.SUCCESS, payload: response });
      } catch (error) {
        console.error("useDataFetcher Error: ", error);
        if (runTask) dispatch({ type: fetchStatus.FAILURE });
      }
    };

    fetchData();

    return () => {
      runTask = false;
    };
  }, [url]);

  return { ...state, setUrl };
};
