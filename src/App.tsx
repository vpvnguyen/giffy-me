import { useState } from "react";
import { CenteredFullPageFlexboxContainer } from "./layouts/CenteredFullPageFlexboxContainer";
import { GiphyApi } from "./api/giphy.api";
import { useDataFetcher } from "./hooks/useDataFetcher";

interface IGifImage {
  gifUrl: string;
  stillUrl: string;
  title: string;
}

const GifList = () => {
  const apiMethod = async () => {
    const searchQuery = "pokemon";
    const limit = 5;
    const offset = 0;
    const explicitRating = "r";

    const response = await GiphyApi.search({
      searchQuery,
      limit,
      offset,
      explicitRating,
    });

    return response;
  };

  const { loading, error, data } = useDataFetcher(apiMethod);

  return (
    <div>
      {loading && <div>Loading user list...</div>}

      {error && <div>There was an error loading the user list.</div>}

      {data &&
        data.searchResults.map((value: any, index: number) => (
          <div key={index} className="p-4">
            <div>{value.id}</div>
            <div>{value.title}</div>
            <div>{value.sourceUrl}</div>

            <GifImage
              gifUrl={value.gifUrl}
              stillUrl={value.stillUrl}
              title={value.title}
            />

            <div>{value.gifUrl}</div>
            <div>{value.stillUrl}</div>
          </div>
        ))}
    </div>
  );
};

const GifImage = (props: IGifImage) => {
  const [animate, setAnimate] = useState(false);

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

const App = () => {
  return (
    <CenteredFullPageFlexboxContainer classes="flex-col">
      <GifList />
    </CenteredFullPageFlexboxContainer>
  );
};

export default App;
