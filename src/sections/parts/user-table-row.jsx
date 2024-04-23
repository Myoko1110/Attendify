import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import TableRow from '@mui/material/TableRow';
import { LinearProgress } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Attendances from 'src/utils/attendances';

// ----------------------------------------------------------------------

export default function UserTableRow({
                                       selected,
                                       name,
                                       headcount,
                                     }) {
  const [cookies,] = useCookies(['']);
  const [rate, setRate] = useState(null);

  useState(() => {
    Attendances.byPart(name, cookies)
      .then(res => {
        setRate(res.rate);
      });
  });

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" />

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>{headcount}</TableCell>

        <TableCell align="center">
          <Grid container alignItems="center" justify="spaceBetween">
            <Grid item xs={6}>
              {rate ? (
                <>
                  {
                    rate >= 80
                      ? <LinearProgress
                        variant="determinate"
                        value={rate}
                        sx={{
                          height: '10px',
                          backgroundColor: 'success.lighter',
                          borderRadius: '100px',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'success.main',
                          },

                        }} />
                      : <LinearProgress
                        variant="determinate"
                        value={rate}
                        sx={{
                          height: '10px',
                          backgroundColor: 'warning.lighter',
                          borderRadius: '100px',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: 'warning.main',
                          },
                        }} />
                  }</>
              ) : (
                <Typography variant="body2">データなし</Typography>
              )}


            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">{rate && (
                <>{rate.toFixed(2)}%</>
              )}</Typography>
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
  headcount: PropTypes.number,
  selected: PropTypes.any,
};
