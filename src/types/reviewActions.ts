export interface nRData {
    book: string
    name : string
    title : string
    text : string
    rating : number
}

export interface rData {
    id : string
}

export type Review = {
  book: string;
  name: string;
  title: string;
  text: string;
  rating: number;
  creationDate: string;
};