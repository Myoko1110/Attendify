import axios from 'axios';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  Alert,
  Stack,
  Dialog,
  Select,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { parts } from '../../_mock/part';

export default function UserEditDialog({
  open,
  setOpen,
  id,
  lastName,
  firstName,
  part,
  grade,
  updateUsers,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [inputLastName, setLastName] = useState(lastName);
  const [inputFirstName, setFirstName] = useState(firstName);
  const [inputPart, setPart] = useState(part);
  const [inputGrade, setGrade] = useState(grade);
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

  const handleChancelClick = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!(inputLastName && inputFirstName && inputPart && inputGrade)) {
      setIsError(true);
    } else {
      const { session, userId } = cookies;
      axios
        .put('http://localhost:8000/api/v1/member/', {
          lastName: inputLastName,
          firstName: inputFirstName,
          id,
          part: inputPart,
          grade: inputGrade,
          userId: userId.replace('_', ''),
          token: session,
        })
        .then(() => {
          updateUsers();
          setOpen(false);
          setEditSuccessOpen(true);
        })
        .catch(() => {
          setOpen(false);
          setEditErrorOpen(true);
        });
    }
  };

  useEffect(() => {
    setLastName(lastName);
    setFirstName(firstName);
    setPart(part);
    setGrade(grade);
    setIsError(false);
  }, [lastName, firstName, part, grade]);

  return (
    <Dialog
      open={open}
      onClose={handleChancelClick}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '444px',
          borderRadius: '16px',
        },
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ padding: '24px' }}>
        編集
      </DialogTitle>
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
                  value={inputLastName}
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
                  value={inputFirstName}
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
                value={inputPart}
                onChange={handlePartChange}
                color="grey"
                fullWidth
              >
                <MenuItem value="" disabled>
                  選択
                </MenuItem>
                {parts.map((row) => (
                  <MenuItem value={row.name} key={row.name}>
                    {row.name}
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
                value={inputGrade}
                onChange={handleGradeChange}
                color="grey"
                fullWidth
              >
                <MenuItem value="" disabled>
                  選択
                </MenuItem>
                <MenuItem value="Junior1">中1</MenuItem>
                <MenuItem value="Junior2">中2</MenuItem>
                <MenuItem value="Junior3">中3</MenuItem>
                <MenuItem value="High1">高1</MenuItem>
                <MenuItem value="High2">高2</MenuItem>
                <MenuItem value="High3">高3</MenuItem>
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
  );
}

UserEditDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.number,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  part: PropTypes.string,
  grade: PropTypes.string,
  updateUsers: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
