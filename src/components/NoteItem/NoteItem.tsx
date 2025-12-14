import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";

type Props = {
  item: Note;
  onDelete: (id: string) => void;
};

const NoteItem = ({ item, onDelete }: Props) => {
  return (
    <div className={css.item}>
      <h3 className={css.title}>{item.title}</h3>

      <p className={css.content}>{item.content}</p>

      <div className={css.actions}>
        <Link href={`/notes/${item.id}`} className={css.link}>
          View details
        </Link>

        <button
          type="button"
          className={css.button}
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;

