import { CenteredFullPageFlexboxContainer } from "./components/layouts/CenteredFullPageFlexboxContainer";
import { GifImage } from "./components/GifImage";
import { GiphyApiModel, IGiphyApiSearchParameters } from "./services/giphy.api";
import { useDataFetcher } from "./hooks/api/useDataFetcher";

// new component to add search parameters and construct search url
const GiphySearchBar = () => {
  return (
    <>
      <div>Search Bar | search button | parameters: limit, rating</div>
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
        response.data.data.map((value: any, index: number) => (
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
        ))}
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
