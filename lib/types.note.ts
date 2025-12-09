
export type NoteTag = "work" | "personal" | "idea" | "other";


export default interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  user?: string;
  createdAt: string;
  updatedAt?: string;
}