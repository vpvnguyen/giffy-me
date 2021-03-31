import { CenteredFullPageFlexboxContainer } from "./components/layouts/CenteredFullPageFlexboxContainer";
import { GifImage } from "./components/GifImage";
import { GiphyApiModel, IGiphyApiSearchParameters } from "./services/giphy.api";
import { useDataFetcher } from "./hooks/api/useDataFetcher";

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
      {loading && <div>Loading user list...</div>}

      {error && <div>There was an error loading the user list.</div>}

      {response &&
        response.data.data.map((value: any, index: number) => (
          <div key={index} className="p-4">
            <div>ID: {value.id}</div>
            <div>Title: {value.title}</div>
            <div>Source: {value.source}</div>
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

const App = () => {
  return (
    <CenteredFullPageFlexboxContainer classes="flex-col">
      <div>Search Bar | search button</div>
      <div>Bookmarks</div>
      <div>Save Search String | Image</div>
      <ViewGiphyList />
    </CenteredFullPageFlexboxContainer>
  );
};

export default App;
