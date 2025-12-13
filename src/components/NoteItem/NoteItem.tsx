import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";

type Props = {
  item: Note;
  onDelete: (id: string) => void; 
};

const NoteItem = ({ item, onDelete }: Props) => {
  return (
    <li className={css.card}>
      <h3 className={css.title}>{item.title}</h3>
      <p className={css.content}>{item.content}</p>

      <div className={css.actions}>
        <Link href={`/notes/${item.id}`} className={css.detailsButton}>
          View details
        </Link>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className={css.deleteButton}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
