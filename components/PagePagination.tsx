"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
const PagePagination = ({
  limit = 15,
  allowNextPage = true,
}: {
  allowNextPage: boolean;
  limit: number;
}) => {
  const searchParams = useSearchParams();
  const currPage = Number(searchParams.get("page")) || 1;

  return (
    <Pagination>
      <PaginationContent className="flex flex-row-reverse">
        {currPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`?page=1&limit=${limit}`}>1</PaginationLink>
          </PaginationItem>
        )}
        {currPage > 2 && (
          <>
            <PaginationItem>
              <span className="[direction:rtl;] hover:cursor-default">
                {">>"}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${currPage - 1}&limit=${limit}`}>
                {currPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <span className="mx-4 italic font-black text-sm ">{currPage}</span>
        <PaginationItem>
          {allowNextPage && (
            <PaginationLink href={`?page=${currPage + 1}&limit=${limit}`}>
              {currPage + 1}
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
