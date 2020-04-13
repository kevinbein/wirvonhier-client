export type lng = number;
export type lat = number;
export type Location = [lng, lat];

export interface IDataProtStatement {
  _id: string;
  [key: string]: string;
}
