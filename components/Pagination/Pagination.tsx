'use client'; 

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      pageCount={totalPages}

      onPageChange={(event) => onPageChange(event.selected + 1)}

      forcePage={currentPage - 1}

      marginPagesDisplayed={1}
      pageRangeDisplayed={5}

      containerClassName={css.pagination}
      activeClassName={css.active}

      previousLabel="←"
      nextLabel="→"
      breakLabel="..."

      pageClassName={css.page}
      previousClassName={css.prev}
      nextClassName={css.next}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
