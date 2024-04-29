import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useState, Fragment, useEffect } from 'react';

import {
  Box,
  Card,
  Table,
  Dialog,
  Button,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TableSortLabel,
} from '@mui/material';

import Attendances from 'src/utils/attendances';

import { applyFilter } from '../parts/utils';
import AttendanceTableRow from './attendance-table-row';
import { visuallyHidden, getMemberComparator } from '../user/utils';

export default function AttendanceDetail({
  isOpen,
  setIsOpen,
  attendances,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [orderBy, setOrderBy] = useState('part');
  const [order, setOrder] = useState('asc');

  const [cookies] = useCookies('');

  const onSort = (property) => (event) => {
    handleSort(event, property);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const dataFiltered = applyFilter({
    inputData: attendances,
    comparator: getMemberComparator(order, orderBy),
  });

  useEffect(() => {
    attendances.forEach((i) => {
      i.getUser(cookies).then((res) => {
        if (!res) {
          i.name = '不明';
        } else {
          i.lastName = res.lastName;
          i.firstName = res.firstName;
          i.part = res.part;
          i.grade = res.grade;
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendances]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '880px',
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle sx={{ padding: '24px' }}>
        {attendances[0] && (
          <>
            {attendances[0].date.getMonth() + 1}月{attendances[0].date.getDate()}日の出欠
          </>
        )}
      </DialogTitle>
      <DialogContent sx={{ overflow: 'auto' }}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      hideSortIcon
                      active={orderBy === 'part'}
                      direction={orderBy === 'part' ? order : 'asc'}
                      onClick={onSort('part')}
                    >
                      パート
                      {orderBy === 'part' ? (
                        <Box sx={{ ...visuallyHidden }}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      hideSortIcon
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={onSort('name')}
                    >
                      名前
                      {orderBy === 'name' ? (
                        <Box sx={{ ...visuallyHidden }}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>出欠</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFiltered.map((row, index) => (
                  <Fragment key={index}>
                    {row.id !== -1 && (
                      <AttendanceTableRow
                        attendance={row}
                        key={index}
                        handleSort={handleSort}
                        setDeleteSuccessOpen={setDeleteSuccessOpen}
                        setDeleteErrorOpen={setDeleteErrorOpen}
                        setEditSuccessOpen={setEditSuccessOpen}
                        setEditErrorOpen={setEditErrorOpen}
                      />
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </DialogContent>
      <DialogActions sx={{ p: '24px' }}>
        <Button variant="outlined" color="inherit" onClick={() => setIsOpen(false)}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AttendanceDetail.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  attendances: PropTypes.instanceOf(Attendances),
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
