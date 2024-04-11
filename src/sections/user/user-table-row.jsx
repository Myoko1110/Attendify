import {useState} from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import {LinearProgress} from "@mui/material";
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
                                       selected,
                                       name,
                                       part,
                                       grade,
                                       rate,
                                       handleClick,
                                     }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
      <>
        <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>

          <TableCell>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </TableCell>

          <TableCell>{part}</TableCell>

          <TableCell>{grade}</TableCell>

          <TableCell align="center">
            <Grid container alignItems="center" justify="spaceBetween">
              <Grid item xs={6}>
                {
                  rate >= 80
                      ? <LinearProgress
                          variant="determinate"
                          value={rate}
                          sx={{
                            height: "10px",
                            backgroundColor: "success.lighter",
                            borderRadius: "100px",
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: "success.main",
                            }

                          }} />
                      : <LinearProgress
                          variant="determinate"
                          value={rate}
                          sx={{
                            height: "10px",
                            backgroundColor: "warning.lighter",
                            borderRadius: "100px",
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: "warning.main",
                            },
                          }} />
                }

              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">{rate.toFixed(2)}%</Typography>

              </Grid>
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
            PaperProps={{
              sx: { width: 140 },
            }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  part: PropTypes.any,
  name: PropTypes.any,
  grade: PropTypes.any,
  rate: PropTypes.number,
  selected: PropTypes.any,

};
