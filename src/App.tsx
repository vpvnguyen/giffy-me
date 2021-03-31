import { useState } from "react";
import { CenteredFullPageFlexboxContainer } from "./components/layouts/CenteredFullPageFlexboxContainer";
import { GiphyApiModel, IGiphyApiSearchParameters } from "./services/giphy.api";
import { useDataFetcher } from "./hooks/api/useDataFetcher";
interface IGifImageProps {
  gifUrl: string;
  stillUrl: string;
  title: string;
}

const GifImage = (props: IGifImageProps) => {
  const [animate, setAnimate] = useState<boolean>(false);

  const handleClick = (event: any) => {
    event.preventDefault();
    setAnimate(!animate);
  };

  return (
    <img
      src={animate ? props.gifUrl : props.stillUrl}
      alt={props.title}
      onClick={handleClick}
    />
  );
};

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
      <ViewGiphyList />
    </CenteredFullPageFlexboxContainer>
  );
};

export default App;
