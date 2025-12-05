import { Box, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;