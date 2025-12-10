import axios from "axios";
import Note from "@/types/note";

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

export const fetchNotes = async (search = ""): Promise<Note[]> => {
  const params: Record<string, string> = {};
  if (search) params.q = search;

  const resp = await api.get("/notes", { params });

  return resp.data.notes;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const resp = await api.get(`/notes/${id}`);

  return resp.data;
};


export const createNote = async (payload: Partial<Note>): Promise<Note> => {
  const resp = await api.post("/notes", payload);
  return resp.data.note;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

