
import axios from "axios";
import { Note } from "@/src/types/note";

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL =
  process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL ||
  "https://next-v1-notes-api.goit.study";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search = ""
): Promise<FetchNotesResponse> => {
  const params: Record<string, string> = {};

  if (search) params.search = search;

  const resp = await api.get<FetchNotesResponse>("/notes", { params });

  return resp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {

  const resp = await api.get<Note>(`/notes/${id}`);

  return resp.data;
};

export const createNote = async (
  payload: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {

  const resp = await api.post<Note>("/notes", payload);

  return resp.data;
};

export const deleteNote = async (id: string): Promise<Note> => {

  const resp = await api.delete<Note>(`/notes/${id}`);

  return resp.data;
};


