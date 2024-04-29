import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Stack, LinearProgress } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Member from 'src/utils/member';
import Attendances from 'src/utils/attendances';

// ----------------------------------------------------------------------

export default function UserTableRow({ selected, name }) {
  const [cookies] = useCookies(['']);
  const [rate, setRate] = useState(null);
  const [actualRate, setActualRate] = useState(null);

  const [members, setMembers] = useState([]);

  const router = useRouter();

  useState(async () => {
    await Attendances.byPart(name, cookies).then((res) => {
      setRate(res.rate);
      setActualRate(res.actualRate);
    });

    await Member.byPart(name, cookies).then((res) => {
      setMembers(res);
    });
  });

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" />

        <TableCell>
          <Typography
            variant="subtitle2"
            noWrap
            onClick={() => router.replace(`/parts/${name}`)}
            sx={{ cursor: 'pointer' }}
          >
            {name}
          </Typography>
        </TableCell>

        <TableCell>{members.length}</TableCell>

        <TableCell align="center">
          <Grid container alignItems="center" justify="spaceBetween">
            <Grid item xs={6}>
              {rate ? (
                <>
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
                </>
              ) : (
                <Typography variant="body2">データなし</Typography>
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
          </Grid>
        </TableCell>

        {/*
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill"/>
          </IconButton>
        </TableCell>
        */}
      </TableRow>

      {/*
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{vertical: 'top', horizontal: 'left'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        PaperProps={{
          sx: {width: 140},
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{mr: 2}}/>
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{color: 'error.main'}}>
          <Iconify icon="eva:trash-2-outline" sx={{mr: 2}}/>
          Delete
        </MenuItem>
      </Popover>
      */}
    </>
  );
}

UserTableRow.propTypes = {
  name: PropTypes.any,
  selected: PropTypes.any,
};
