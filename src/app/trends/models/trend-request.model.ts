import {TrendProvider} from "./trend-provider.model";

export type TrendRequest = {
  body: string,
  image: string,
  provider: TrendProvider,
  title: string,
  url: string,
}
