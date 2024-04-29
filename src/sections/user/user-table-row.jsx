import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import { Chip, Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

import { useRouter } from 'src/routes/hooks';

import Member from 'src/utils/member';
import Attendances from 'src/utils/attendances';

import Iconify from 'src/components/iconify';

import UserEditDialog from './user-edit-dialog';
import UserDeleteDialog from './user-delete-dialog';

// ----------------------------------------------------------------------

export default function UserTableRow({
  member,
  selected,
  handleClick,
  updateUsers,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [rate, setRate] = useState(null);
  const [actualRate, setActualRate] = useState(null);

  const [cookies] = useCookies(['']);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    handleCloseMenu();
  };
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  useState(async () => {
    await Attendances.byMember(member.id, cookies).then((r) => {
      setRate(r.rate);
      setActualRate(r.actualRate);
      member.rate = r.rate;
    });
  });

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>
          <Typography
            variant="subtitle1"
            noWrap
            onClick={() => router.replace(`/members/${member.id}`)}
            sx={{ cursor: 'pointer' }}
          >
            {member.lastName}&nbsp;{member.firstName}
          </Typography>
        </TableCell>

        <TableCell>
          <Chip
            label={member.part}
            variant="outlined"
            onClick={() => router.replace(`/parts/${member.part}`)}
          />
        </TableCell>

        <TableCell>
          <Chip
            label={member.grade.jpOmitted}
            variant="outlined"
            onClick={() => router.replace(`/grade/${member.grade.enOmitted}`)}
          />
        </TableCell>

        <TableCell align="center">
          <Grid container alignItems="center" justify="spaceBetween">
            {rate ? (
              <>
                <Grid item xs={6}>
                  {rate >= 80 ? (
                    <LinearProgress
                      variant="determinate"
                      value={rate}
                      sx={{
                        height: '10px',
                        backgroundColor: 'success.lighter',
                        borderRadius: '100px',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'success.main',
                        },
                      }}
                    />
                  ) : (
                    <LinearProgress
                      variant="determinate"
                      value={rate}
                      sx={{
                        height: '10px',
                        backgroundColor: 'warning.lighter',
                        borderRadius: '100px',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'warning.main',
                        },
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" gap={1}>
                    <Typography variant="subtitle2" width={70} textAlign="right">
                      {rate && <>{rate.toFixed(2)}%</>}
                    </Typography>
                    <Typography variant="body2" width={60}>
                      {actualRate && <>({actualRate.toFixed(2)}%)</>}
                    </Typography>
                  </Stack>
                </Grid>
              </>
            ) : (
              <Typography variant="body2">データなし</Typography>
            )}
          </Grid>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 140 },
          },
        }}
      >
        <MenuItem onClick={handleEditDialogOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          編集
        </MenuItem>

        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          削除
        </MenuItem>
      </Popover>
      <UserDeleteDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        member={member}
        updateUsers={updateUsers}
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
      />
      <UserEditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        member={member}
        updateUsers={updateUsers}
        setEditSuccessOpen={setEditSuccessOpen}
        setEditErrorOpen={setEditErrorOpen}
      />
    </>
  );
}

UserTableRow.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
  updateUsers: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
