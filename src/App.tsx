import { CenteredFullPageFlexboxContainer } from "./components/layouts/CenteredFullPageFlexboxContainer";
import { GifImage } from "./components/GifImage";
import {
  GiphyApiModel,
  IGiphyApiSearchParameters,
  IGiphyApiSearchResponse,
} from "./services/giphy.api";
import { useDataFetcher } from "./hooks/api/useDataFetcher";

// new component to add search parameters and construct search url
const GiphySearchBar = () => {
  return (
    <>
      <div>Search Bar | search button | parameters: limit, rating</div>

      <div className="p-8">
        <div className="bg-white flex items-center rounded-full shadow-xl">
          <input
            className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Search"
          />

          <div className="p-4">
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
              icon
            </button>
          </div>
        </div>
      </div>

      {/* dropdown */}
      <div className="relative inline-flex">
        <svg
          className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          />
        </svg>
        <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
          <option>Choose a color</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Yellow</option>
          <option>Black</option>
          <option>Orange</option>
          <option>Purple</option>
          <option>Gray</option>
          <option>White</option>
        </select>
      </div>
    </>
  );
};

const Bookmarks = () => {
  return (
    <>
      <div>Bookmarks</div>
    </>
  );
};

const ViewGiphyListActions = () => {
  return (
    <>
      <div>Save Search String | Image</div>
    </>
  );
};

// pass search URL into component to fetch data
const ViewGiphyList = () => {
  const searchParameters: IGiphyApiSearchParameters = {
    searchQuery: "pokemon",
    limit: 5,
    offset: 0,
    explicitRating: "r",
  };

  const url: string = GiphyApiModel.getSearchUrl(searchParameters);

  const { loading, error, response } = useDataFetcher(url);

  return (
    <div>
      <h1 className="p-4">Search String: {searchParameters.searchQuery}</h1>

      {loading && <div>Loading user list...</div>}

      {error && <div>There was an error loading the user list.</div>}

      {response &&
        response.data.data.map(
          (value: IGiphyApiSearchResponse, index: number) => (
            <div key={index} className="p-4">
              <div>ID: {value.id}</div>
              <div>Title: {value.title}</div>
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
          )
        )}
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
    <CenteredFullPageFlexboxContainer classes="flex-col">
      <GiphySearchBar />
      <Bookmarks />
      <ViewGiphyListActions />
      <ViewGiphyList />
      <ViewGiphyListPagination />
    </CenteredFullPageFlexboxContainer>
  );
};

export default App;
