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

import Parts from 'src/utils/part';
import Grades from 'src/utils/grade';
import Member from 'src/utils/member';

export default function UserEditDialog({
  open,
  setOpen,
  member,
  updateUsers,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [lastName, setLastName] = useState(member.lastName);
  const [firstName, setFirstName] = useState(member.firstName);
  const [part, setPart] = useState(member.part);
  const [grade, setGrade] = useState(member.grade);
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
    setIsError(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!(lastName && firstName && part && grade)) {
      setIsError(true);
    } else {
      setIsError(false);

      const { session, userId } = cookies;
      axios
        .put('http://localhost:8000/api/v1/member/', {
          lastName,
          firstName,
          id: member.id,
          part,
          grade,
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
    setLastName(member.lastName);
    setFirstName(member.firstName);
    setPart(member.part);
    setGrade(member.grade.en);
    setIsError(false);
  }, [member]);

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
                {Object.keys(Grades).map(key => (
                  <MenuItem key={Grades[key].en} value={Grades[key].en}>{Grades[key].jpOmitted}</MenuItem>
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
  );
}

UserEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  member: PropTypes.instanceOf(Member).isRequired,
  updateUsers: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
