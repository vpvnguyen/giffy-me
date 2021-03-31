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
  private static readonly _baseUrl: string = "https://api.giphy.com/v1/gifs";
  private static readonly _apiKey: string =
    process.env.REACT_APP_GIPHY_API_KEY || "";

  public static getSearchUrl = (
    searchParameters: IGiphyApiSearchParameters
  ): string => {
    const { searchQuery, limit, offset, explicitRating } = searchParameters;
    return `${GiphyApiModel._baseUrl}/search?api_key=${GiphyApiModel._apiKey}&q=${searchQuery}&limit=${limit}&offset=${offset}&rating=${explicitRating}&lang=en`;
  };
}
