'use client';

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '@/lib/api';
import Link from 'next/link';
import css from './Notes.client.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const { data: notes, isLoading, error } = useQuery({
    queryKey: ["notes", search],
    queryFn: () => fetchNotes(search),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <ul className={css.list}>
        {notes?.map((note) => (
          <li key={note.id} className={css.item}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div className={css.actions}>
              <Link href={`/notes/${note.id}`}>View details</Link>

              <button
                onClick={async () => {
                  await deleteNote(note.id);
                  queryClient.invalidateQueries({ queryKey: ["notes"] });
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
