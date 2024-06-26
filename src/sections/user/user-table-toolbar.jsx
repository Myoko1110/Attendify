import { useState } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import { TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import UsersDeleteDialog from './users-delete-dialog';

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  selected,
  setSelected,
  filterName,
  onFilterName,
  updateUsers,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  page,
  members,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(selected.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected.length}件選択中
        </Typography>
      ) : (
        <>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="検索"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <TablePagination
            page={page}
            component="div"
            count={members.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[20, 50, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="1ページあたりの表示数"
          />
        </>
      )}

      {selected.length > 0 && (
        <Tooltip title="削除">
          <IconButton onClick={handleClick}>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      )}
      <UsersDeleteDialog
        open={open}
        setOpen={setOpen}
        ids={selected}
        updateUsers={updateUsers}
        setSelected={setSelected}
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
      />
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  updateUsers: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  page: PropTypes.number,
  members: PropTypes.any,
  rowsPerPage: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
};
