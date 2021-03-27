import axios from "axios";

export interface IGiphyApi {
  searchQuery: string;
  limit: number;
  offset: number;
  explicitRating: "g" | "pg" | "pg-13" | "r";
}

const getGifStillUrl = (giphyData: any, imageSizeType: any) =>
  giphyData.images[`${imageSizeType}_still`].url;

const getGifUrl = (giphyData: any, imageSizeType: any) =>
  giphyData.images[imageSizeType].url;

const imageSizeTypes = {
  FIXED_WIDTH: `fixed_width`,
};

export class GiphyApi {
  private static readonly _url: string = "https://api.giphy.com/v1/gifs";

  public static search = async ({
    searchQuery,
    limit,
    offset,
    explicitRating,
  }: IGiphyApi) => {
    try {
      const url = `${GiphyApi._url}/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=${explicitRating}&lang=en`;

      const response = await axios.get(url);
      console.log(`${GiphyApi.name} searchGiphy`, response);

      const searchResults = response.data.data.map(
        (giphyData: any, index: number) => ({
          id: giphyData.id,
          title: giphyData.title,
          sourceUrl: giphyData.source,
          gifUrl: getGifUrl(giphyData, imageSizeTypes.FIXED_WIDTH),
          stillUrl: getGifStillUrl(giphyData, imageSizeTypes.FIXED_WIDTH),
        })
      );

      const { pagination } = response.data;

      return { searchResults, pagination };
    } catch (error) {
      console.error(`${GiphyApi.name} Error:`, error);
      return null;
    }
  };
}
