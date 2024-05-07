import { Note } from "./note";

export interface Collection {
    _id: string;
    title: string;
    users: string[];
    notes: Note[];
}
