// specified according to https://newsapi.org/docs/endpoints/everything
export interface newsResponse {
  status: string;
  totalResults: Int16Array;
  articles: article[];
}
export interface article {
  source: {};
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
