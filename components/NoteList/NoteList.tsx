

import { Note } from "@/types/note";
import NoteItem from "@/components/NoteItem/NoteItem";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};

const NoteList = ({ notes, onDelete }: Props) => {
  return (
    <div className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} item={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default NoteList;
