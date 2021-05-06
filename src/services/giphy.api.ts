export interface IGiphyApiSearchParameters {
  searchQuery: string;
  limit: number;
  offset: number;
  explicitRating: "g" | "pg" | "pg-13" | "r";
}

export interface IGiphyApiSearchResponse {
  id: string;
  title: string;
  source: string;
  images: any;
}
export class GiphyApiModel {
  private readonly _baseUrl: string = "https://api.giphy.com/v1/gifs";
  private readonly _apiKey: string =
    process.env.REACT_APP_GIPHY_API_KEY || "";

    constructor () {
      try {
        this.init()
      } catch (error) {
        console.error(`${GiphyApiModel.name}`, error)
      }
    }

  public getSearchUrl = (
    searchParameters: IGiphyApiSearchParameters
  ): string => {
    const { searchQuery, limit, offset, explicitRating } = searchParameters;
    return `${this._baseUrl}/search?api_key=${this._apiKey}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=${explicitRating}&lang=en`;
  };

  private init = () => {
    if (!process.env.REACT_APP_GIPHY_API_KEY) throw new Error(`API key does not exist in ${GiphyApiModel.name}. API Key: ${process.env.REACT_APP_GIPHY_API_KEY}. Visit: https://developers.giphy.com/docs/api#quick-start-guide for an API Key`)
  }

}
