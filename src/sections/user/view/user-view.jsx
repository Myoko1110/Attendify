import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getMembers } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import Snackbars from '../snackbers';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserAddDialog from '../user-add-dialog';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function MembersPage() {
  const [cookies] = useCookies(['status', '']);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [members, setMembers] = useState(getMembers(cookies.userId, cookies.session));

  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [editSuccessOpen, setEditSuccessOpen] = useState(false);
  const [editErrorOpen, setEditErrorOpen] = useState(false);

  if (!members) {
    return <p>エラー</p>;
  }

  const updateUsers = () => {
    setMembers(getMembers(cookies.userId, cookies.session));
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const dataFiltered = applyFilter({
    inputData: members,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h3">部員</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleDialogOpen}
        >
          追加
        </Button>
        <UserAddDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          updateUsers={updateUsers}
        />
      </Stack>
      <Card>
        <UserTableToolbar
          selected={selected}
          setSelected={setSelected}
          filterName={filterName}
          onFilterName={handleFilterByName}
          updateUsers={updateUsers}
          setDeleteSuccessOpen={setDeleteSuccessOpen}
          setDeleteErrorOpen={setDeleteErrorOpen}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={members.length}
                selected={selected}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: '名前' },
                  { id: 'part', label: 'パート' },
                  { id: 'grade', label: '学年' },
                  { id: 'rate', label: '出席率' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      lastName={row.lastName}
                      firstName={row.firstName}
                      part={row.part}
                      grade={row.grade}
                      rate={100}
                      id={row.id}
                      selected={selected.indexOf(row.id) !== -1}
                      handleClick={(event) => handleClick(event, row.id)}
                      updateUsers={updateUsers}
                      setDeleteSuccessOpen={setDeleteSuccessOpen}
                      setDeleteErrorOpen={setDeleteErrorOpen}
                      setEditSuccessOpen={setEditSuccessOpen}
                      setEditErrorOpen={setEditErrorOpen}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, members.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

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
      </Card>
      <Snackbars
        deleteSuccessOpen={deleteSuccessOpen}
        deleteErrorOpen={deleteErrorOpen}
        editSuccessOpen={editSuccessOpen}
        editErrorOpen={editErrorOpen}
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
        setEditSuccessOpen={setEditSuccessOpen}
        setEditErrorOpen={setEditErrorOpen}
      />
    </Container>
  );
}
