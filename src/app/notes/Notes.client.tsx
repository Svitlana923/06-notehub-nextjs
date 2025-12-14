'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';

import css from './Notes.client.module.css';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, currentPage],
    queryFn: () => fetchNotes(debouncedSearch, currentPage),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  return (
    <div className={css.container}>
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button type="button" onClick={() => setIsModalOpen(true)}>
          Create note
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Could not fetch notes: {error.message}</p>}

      {!isLoading && !error && (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
