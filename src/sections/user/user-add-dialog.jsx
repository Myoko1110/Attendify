import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import MenuItem from '@mui/material/MenuItem';
import {
  Stack,
  Alert,
  Dialog,
  Select,
  Button,
  Snackbar,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

import Grades from 'src/utils/grade';
import instance from 'src/utils/api';

import Parts from '../../utils/part';

export default function UserAddDialog({ isDialogOpen, setIsDialogOpen, updateUsers }) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [part, setPart] = useState('');
  const [grade, setGrade] = useState('');

  const [addSuccessSnackbarOpen, setAddSuccessSnackbarOpen] = useState(false);
  const [addErrorSnackbarOpen, setAddErrorSnackbarOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  const [cookies] = useCookies(['']);

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handlePartChange = (e) => {
    setPart(e.target.value);
  };
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const resetInputs = () => {
    setLastName('');
    setFirstName('');
    setPart('');
    setGrade('');
    setIsError(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!(lastName && firstName && part && grade)) {
      setIsError(true);
    } else {
      setIsError(false);
      const { session, userId } = cookies;
      instance
        .post('/api/v1/member/', {
          lastName,
          firstName,
          part,
          grade,
          userId: userId.replace('_', ''),
          token: session,
        })
        .then(() => {
          setIsDialogOpen(false);
          updateUsers();
          resetInputs();
          setAddSuccessSnackbarOpen(true);
        })
        .catch(() => {
          setIsDialogOpen(false);
          setAddErrorSnackbarOpen(true);
        });
    }
  };

  const handleChancelClick = () => {
    setIsDialogOpen(false);
    setIsError(false);
  };

  const handleSuccessSnackbarClose = () => {
    setAddSuccessSnackbarOpen(false);
  };
  const handleErrorSnackbarClose = () => {
    setAddErrorSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={isDialogOpen}
        onClose={handleChancelClick}
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '444px',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ padding: '24px' }}>部員を追加</DialogTitle>
        <form onSubmit={handleClick}>
          <DialogContent sx={{ paddingTop: '10px!important' }}>
            <Stack direction="column" gap="24px">
              {isError && <Alert severity="error">未入力の項目があります。</Alert>}
              <FormControl>
                <Stack direction="row">
                  <TextField
                    id="name"
                    label="姓"
                    type="text"
                    variant="outlined"
                    value={lastName}
                    onChange={handleLastNameChange}
                    color="grey"
                    fullWidth
                    sx={{ mr: 0.5 }}
                  />
                  <TextField
                    id="name"
                    label="名"
                    type="text"
                    variant="outlined"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    color="grey"
                    fullWidth
                    sx={{ ml: 0.5 }}
                  />
                </Stack>
              </FormControl>
              <FormControl>
                <InputLabel id="add-member-part-label" color="grey">
                  パート
                </InputLabel>
                <Select
                  id="part"
                  labelId="add-member-part-label"
                  label="パート"
                  defaultValue=""
                  value={part}
                  onChange={handlePartChange}
                  color="grey"
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    選択
                  </MenuItem>
                  {Parts.map((row) => (
                    <MenuItem value={row.en} key={row.en}>
                      {row.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="add-member-grade-label" color="grey">
                  学年
                </InputLabel>
                <Select
                  id="part"
                  labelId="add-member-grade-label"
                  label="学年"
                  defaultValue=""
                  value={grade}
                  onChange={handleGradeChange}
                  color="grey"
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    選択
                  </MenuItem>
                  {Object.keys(Grades).map((key) => (
                    <MenuItem key={Grades[key].en} value={Grades[key].en}>
                      {Grades[key].jpOmitted}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: '24px' }}>
            <Button variant="outlined" color="inherit" onClick={handleChancelClick}>
              キャンセル
            </Button>
            <Button variant="contained" color="inherit" type="submit">
              保存
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addSuccessSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleSuccessSnackbarClose}
        >
          部員を追加しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addErrorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleErrorSnackbarClose}
        >
          追加に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}
UserAddDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  setIsDialogOpen: PropTypes.func,
  updateUsers: PropTypes.func,
};
