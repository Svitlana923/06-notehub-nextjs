import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";

type Props = {
  item: Note;
  onDelete: (id: string) => void;
};

const NoteItem = ({ item, onDelete }: Props) => {
  return (
    <div className={css.card}>
      <h3 className={css.title}>
        <Link href={`/notes/${item.id}`}>{item.title}</Link>
      </h3>
      <p className={css.content}>{item.content}</p>
      <p className={css.date}>
        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
      </p>
      <div className={css.actions}>
        <button className={css.deleteButton} onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
