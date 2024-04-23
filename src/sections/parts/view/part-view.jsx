import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Parts from 'src/utils/part';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import PartTableRow from '../user-table-row';
import PartTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';

// ----------------------------------------------------------------------

export default function PartsPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Parts.map((n) => n.en);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3">パート</Typography>
          {/*
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            追加
          </Button>
          */}
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <PartTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={Parts.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'name', label: '名前' },
                      { id: 'headcount', label: '人数' },
                      { id: 'rate', label: '出席率' },
                    ]}
                />
                <TableBody>
                  {Parts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                          <PartTableRow
                              key={row.en}
                              name={row.en}
                              grade={row.grade}
                              selected={selected.indexOf(row.en) !== -1}
                              handleClick={(event) => handleClick(event, row.en)}
                          />
                      ))}

                  <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, Parts.length)}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
              page={page}
              component="div"
              count={Parts.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[20, 50, 100]}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
  );
}
