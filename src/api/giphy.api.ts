import axios from "axios";

// const GIPHY_URL = "https://api.giphy.com/v1/gifs";
export class GiphyApi {
  private static readonly _url: string = "https://api.giphy.com/v1/gifs";

  public static searchGiphy = async (
    searchQuery: string,
    limit: number,
    offset: number,
    explicitRating: string
  ) => {
    try {
      const url = `${GiphyApi._url}/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=${explicitRating}&lang=en`;

      const response = await axios.get(url);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
}
