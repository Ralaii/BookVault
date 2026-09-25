import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function BookPagination({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(p => p - 1)}
            className={page === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

        <PaginationItem className="text-sm px-2">
          {page + 1} / {totalPages}
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(p => p + 1)}
            className={page + 1 === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}

export default BookPagination