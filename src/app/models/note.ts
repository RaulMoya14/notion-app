import { Item } from "./item";

export interface Note {
    idUser: string;
    listItems: Item[];
    title: string;
  }
