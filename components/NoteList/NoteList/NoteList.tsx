
import Note from "@/lib/types.note";
import NoteItem from "@/components/Header/NoteItem/NoteItem/NoteItem";

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <ul>
      {notes.map((note) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </ul>
  );
}

export default NoteList;
