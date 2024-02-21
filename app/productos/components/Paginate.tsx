export type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
};
import { Pagination, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function Paginate({
  totalPages,
  setCurrentPage,
  currentPage,
}: Props) {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.stopPropagation();

    setCurrentPage(page);
  };

  return (
    <Stack spacing={2} className="flex items-center">
      <Pagination
        count={totalPages}
        page={currentPage}
        defaultPage={6}
        onChange={handleChange}
      />
      {/* Default ranges */}
      {/* <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination
        count={11}
        defaultPage={6}
        siblingCount={0}
        boundaryCount={2}
      />
      <Pagination count={11} defaultPage={6} boundaryCount={2} /> */}
    </Stack>
  );
}
