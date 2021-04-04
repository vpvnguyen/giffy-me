import { useEffect, useState } from "react";
import { FlexboxContainerFullWidthCentered } from "./components/layouts/FlexboxContainerFullWidthCentered";
import { GifImage } from "./components/GifImage";
import { GiphyApiModel, IGiphyApiSearchResponse } from "./services/giphy.api";
import { useDataFetcher } from "./hooks/api/useDataFetcher";
import {
  SearchBarContextProvider,
  useSearchBarContext,
  useSearchHistoryContext,
  useSearchUrlContext,
} from "./hooks/context/SearchBarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

// new component to add search parameters and construct search url
const SearchBar = (props: any) => (
  <form onSubmit={props.handleClickSearchButton}>
    <div className="flex items-center rounded-full border border-gray-400 hover:border-gray-700">
      <input
        className="rounded-full w-full py-4 px-6 text-gray-700 focus:outline-none appearance-none"
        id="search"
        type="text"
        placeholder={props.searchQueryHistory || "Search"}
        name={`searchQuery`}
        value={props.searchQuery}
        onChange={props.handleChangeSearchInput}
      />

      <div className="p-4">
        {props.searchQuery && (
          <button
            onClick={props.handleClickClearSearch}
            className="text-gray-400 hover:text-red-400"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
      </div>

      <div className="h-4 border border-r border-gray-300" />

      <div className="p-4">
        <button type="submit" className="text-blue-500 hover:text-blue-300">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  </form>
);

const SelectDropdown = (props: any) => {
  const explicitRatingSelectOptions = [
    { key: "g", name: "G" },
    { key: "pg", name: "PG" },
    { key: "pg-13", name: "PG-13" },
    { key: "r", name: "R" },
  ];

  return (
    <>
      <div className="relative inline-flex">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>

        <select
          className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          name={props.name}
          onChange={props.handleChangeSearchInput}
        >
          {explicitRatingSelectOptions.map((value: any) => (
            <option value={value.key} key={value.key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

const Header = () => {
  console.log("Header()");

  const { searchInput, setSearchInput } = useSearchBarContext();
  const { setSearchUrl } = useSearchUrlContext();
  // import previous search query
  const { searchHistory, setSearchHistory } = useSearchHistoryContext();

  const handleChangeSearchInput = (event: any) => {
    console.log("Header handleChangeSearchInput", event.target.value);

    setSearchInput({
      ...searchInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickSearchButton = (event: any) => {
    event.preventDefault();

    console.log("handleClickSearchButton searchInput", searchInput);

    const url: string = GiphyApiModel.getSearchUrl(searchInput);

    console.log("handleClickSearchButton url", url);
    setSearchUrl(url);

    setSearchInput({ ...searchInput, searchQuery: "" });

    // set previous search query
    setSearchHistory({
      ...searchHistory,
      searchQuery: searchInput.searchQuery,
    });
  };

  const handleClickClearSearch = (event: any) => {
    event.preventDefault();

    setSearchInput({ ...searchInput, searchQuery: "" });
  };

  return (
    <>
      <SearchBar
        handleChangeSearchInput={handleChangeSearchInput}
        handleClickSearchButton={handleClickSearchButton}
        handleClickClearSearch={handleClickClearSearch}
        searchQueryHistory={searchHistory.searchQuery}
        searchQuery={searchInput.searchQuery}
      />

      {/* rating dropdown */}
      <SelectDropdown
        name={`explicitRating`}
        handleChangeSearchInput={handleChangeSearchInput}
      />

      <Bookmarks />
    </>
  );
};

const Bookmarks = () => {
  const bookmarks = [
    { key: "bookmark1", name: "bookmark1" },
    { key: "bookmark2", name: "bookmark2" },
  ];

  return (
    <>
      <div className="relative inline-flex">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>

        <select
          className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          name={`bookmarks`}
          // onChange={handleChangeSearchInput}
        >
          {bookmarks.map((value: any) => (
            <option value={value.key} key={value.key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

const MessageBanner = () => {
  return (
    <div className="sm:container flex flex-col items-center border border-red-400">
      <p className="p-4">Message Banner</p>
    </div>
  );
};

// pass search URL into component to fetch data
const ViewGiphyList = () => {
  const { searchUrl } = useSearchUrlContext();
  console.log("ViewGiphyList searchUrl", searchUrl);

  const { loading, error, response, setUrl } = useDataFetcher();

  useEffect(() => {
    setUrl(searchUrl);
  }, [searchUrl, setUrl]);

  return (
    <div className="sm:container">
      <div className="flex flex-wrap justify-center items-center border border-green-400">
        {loading && <div>Loading Gifs...</div>}

        {error && <div>There was an error loading Gifs.</div>}

        {response &&
          response.data &&
          response.data.data &&
          response.data.data.map((value: IGiphyApiSearchResponse) => (
            <div
              key={value.id}
              id={value.id}
              className="border border-gray-300 rounded-lg w-64 m-4 p-4"
            >
              <div className="pb-4">{value.title.toUpperCase()}</div>
              {value.source && (
                <a href={value.source} target="_blank" rel="noreferrer">
                  Source
                </a>
              )}
              <GifImage
                title={value.title}
                gifUrl={value.images.fixed_width.url}
                stillUrl={value.images.fixed_width_still.url}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

const ViewGiphyListPagination = () => {
  return (
    <>
      <div>Pagination | Lazy Loading (all images)</div>
    </>
  );
};

const App = () => {
  return (
    <FlexboxContainerFullWidthCentered classes="flex-col">
      <SearchBarContextProvider>
        <div className="sm:container border border-gray-400 py-12">
          <Header />
        </div>
        <MessageBanner />
        <ViewGiphyList />
        <ViewGiphyListPagination />
      </SearchBarContextProvider>
    </FlexboxContainerFullWidthCentered>
  );
};

export default App;
