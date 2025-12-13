import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Search notes",
}: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
