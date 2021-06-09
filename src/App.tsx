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

    const GiphyApi = new GiphyApiModel();
    const giphyUrl: string = GiphyApi.getSearchUrl(searchInput);

    console.log("SearchBar handleClickSearchButton url", giphyUrl);
    setSearchUrl(giphyUrl);

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
      <div className="flex items-center border border-gray-400 rounded-full hover:border-gray-600">
        <input
          className="w-full px-6 py-4 text-gray-700 rounded-full appearance-none focus:outline-none"
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
          className="pr-1 bg-white appearance-none cursor-pointer hover:text-blue-600 focus:outline-none"
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
  return (
    <div className="w-full py-12 border border-gray-400">
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
  const { loading, error, response, setUrl } = useDataFetcher();

  useEffect(() => {
    setUrl(searchUrl);
  }, [searchUrl, setUrl]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center w-full border border-green-400">
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
              className="w-64 p-4 m-4 border border-gray-300 rounded-lg"
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
        classes="flex-col justify-center items-center"
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
