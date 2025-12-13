"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/src/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ id }: { id: string }) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) {
    return (
      <p>
        Error loading the note: {(error as Error).message}
      </p>
    );
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

