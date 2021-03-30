import { useEffect, useReducer } from "react";

interface IfetchStatus {
  INIT: "FETCH_INIT";
  SUCCESS: "FETCH_SUCCESS";
  FAILURE: "FETCH_FAILURE";
}

const fetchStatus: IfetchStatus = {
  INIT: "FETCH_INIT",
  SUCCESS: "FETCH_SUCCESS",
  FAILURE: "FETCH_FAILURE",
};

const dataFetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case fetchStatus.INIT:
      return { ...state, loading: true, error: false };
    case fetchStatus.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case fetchStatus.FAILURE:
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
      dispatch({ type: fetchStatus.INIT });

      try {
        const response = await apiMethod();
        if (runTask) dispatch({ type: fetchStatus.SUCCESS, payload: response });
      } catch (error) {
        if (runTask) dispatch({ type: fetchStatus.FAILURE });
      }
    };

    fetchData();

    return () => {
      runTask = false;
    };
  }, []);

  return { ...state };
};
