import { useEffect, useState } from "react";
import {
  FlexContainer,
  FlexFullWidthCenter,
} from "./components/layouts/FlexContainers";
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
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

const SearchBar = () => {
  const { searchInput, setSearchInput } = useSearchBarContext();
  const { setSearchUrl } = useSearchUrlContext();
  const { searchHistory, setSearchHistory } = useSearchHistoryContext();

  const handleChangeSearchInput = (event: any) => {
    console.log("SearchBar handleChangeSearchInput", event.target.value);

    setSearchInput({
      ...searchInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickSearchButton = (event: any) => {
    event.preventDefault();

    console.log("SearchBar handleClickSearchButton searchInput", searchInput);

    const url: string = GiphyApiModel.getSearchUrl(searchInput);

    console.log("SearchBar handleClickSearchButton url", url);
    setSearchUrl(url);

    setSearchInput({ ...searchInput, searchQuery: "" });

    // set previous search query
    setSearchHistory({
      ...searchHistory,
      searchQuery: searchInput.searchQuery,
    });
  };

  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) handleClickSearchButton(event);
  };

  const handleClickClearSearch = (event: any) => {
    event.preventDefault();

    setSearchInput({ ...searchInput, searchQuery: "" });
  };

  return (
    <form onSubmit={handleClickSearchButton}>
      <div className="flex items-center rounded-full border border-gray-400 hover:border-gray-600">
        <input
          className="w-full rounded-full py-4 px-6 text-gray-700 focus:outline-none appearance-none"
          id="search"
          type="text"
          placeholder={searchHistory.searchQuery || "Search Gifs"}
          name={`searchQuery`}
          value={searchInput.searchQuery}
          onChange={handleChangeSearchInput}
          onKeyPress={handleKeyPress}
        />

        <div className="p-4">
          {searchInput.searchQuery && (
            <button
              type="reset"
              onClick={handleClickClearSearch}
              className="text-gray-400 hover:text-red-400"
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          )}
        </div>

        <div className="h-5 border border-r border-gray-200" />

        <SelectDropdown
          name={`explicitRating`}
          handleChangeSearchInput={handleChangeSearchInput}
        />

        <div className="h-5 border border-r border-gray-200" />

        <div className="p-4">
          <button type="submit" className="text-blue-400 hover:text-blue-600">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </form>
  );
};

const SelectDropdown = (props: any) => {
  const explicitRatingSelectOptions = [
    { key: "g", name: "G" },
    { key: "pg", name: "PG" },
    { key: "pg-13", name: "PG-13" },
    { key: "r", name: "R" },
  ];

  return (
    <>
      <div className="flex items-center px-2 text-xs text-gray-400 hover:text-blue-600">
        <select
          className="pr-1 bg-white hover:text-blue-600 focus:outline-none cursor-pointer appearance-none"
          name={props.name}
          onChange={props.handleChangeSearchInput}
        >
          {explicitRatingSelectOptions.map((value: any) => (
            <option value={value.key} key={value.key}>
              Rating: {value.name}
            </option>
          ))}
        </select>

        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </>
  );
};

const Header = () => {
  console.log("Header()");

  return (
    <div className="w-full border border-gray-400 py-12">
      <SearchBar />
    </div>
  );
};

const MessageBanner = () => {
  return (
    <div className="w-full border border-red-400 ">
      <p className="p-4">Message Banner</p>
    </div>
  );
};

const ViewGiphyList = () => {
  const { searchUrl } = useSearchUrlContext();
  console.log("ViewGiphyList searchUrl", searchUrl);

  const { loading, error, response, setUrl } = useDataFetcher();

  useEffect(() => {
    setUrl(searchUrl);
  }, [searchUrl, setUrl]);

  return (
    <>
      <div className="w-full flex flex-wrap justify-center items-center border border-green-400">
        <h1>Gif List</h1>
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
    </>
  );
};

const App = () => {
  return (
    <FlexFullWidthCenter>
      <FlexContainer
        container="sm"
        classes="flex-col justify-center items-center "
      >
        <SearchBarContextProvider>
          <Header />
          <MessageBanner />
          <ViewGiphyList />
        </SearchBarContextProvider>
      </FlexContainer>
    </FlexFullWidthCenter>
  );
};

export default App;
