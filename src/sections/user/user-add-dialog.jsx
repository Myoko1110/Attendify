import axios from 'axios';
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
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent, DialogActions,
} from '@mui/material';

import { parts } from '../../_mock/part';

export default function UserAddDialog({
  isDialogOpen,
  setIsDialogOpen
                                      }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [part, setPart] = useState("");
  const [grade, setGrade] = useState("");

  const [isError, setIsError] = useState(false);

  const [cookies,] = useCookies(["status", ""]);

  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePartChange = (e) => {
    setPart(e.target.value)
  }
  const handleGradeChange = (e) => {
    setGrade(e.target.value)
  }

  const handleClick = () => {
    if (!(name && email && part && grade)) {
      setIsError(true);
    } else {

      const {session, userId} = cookies;
      axios.post("http://localhost:8000/api/v1/member/", { name, email, part, grade, userId: userId.replace("_", ""), token: session })
        .then(response => {
          setIsDialogOpen(false);

          
        })
        .catch(error => {
          setIsDialogOpen(false);
        });
      
    }
  }

  const handleChancelClick = () => {
    setIsDialogOpen(false);
  }

  return (
    <Dialog
      open={isDialogOpen}
      sx={{
        '& .MuiPaper-root': {
          width: "100%",
          maxWidth: "444px",
          borderRadius: "16px",
        }
      }}
    >
      <DialogTitle sx={{padding: "24px"}}>部員を追加</DialogTitle>
      <DialogContent sx={{paddingTop: "10px!important"}}>
        <Stack direction="column" gap="24px">
          {isError && (
            <Alert severity="error">
              未入力の項目があります。
            </Alert>
          )}
          <FormControl>
            <TextField
              id="name"
              label="名前"
              type="text"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              color="grey"
              fullWidth
            />
          </FormControl>
          <FormControl>
            <TextField
              id="email"
              label="メールアドレス"
              type="email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              color="grey"
              fullWidth
            />
          </FormControl>
          <FormControl>
            <InputLabel id="add-member-part-label" color="grey">パート</InputLabel>
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
              <MenuItem value="" disabled>選択</MenuItem>
              {
                parts.map((row) => (
                  <MenuItem value={row.name} key={row.name}>{row.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="add-member-grade-label" color="grey">学年</InputLabel>
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
              <MenuItem value="" disabled>選択</MenuItem>
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
      <DialogActions sx={{p: "24px"}}>
        <Button variant="outlined" color="inherit" onClick={handleChancelClick}>キャンセル</Button>
        <Button variant="contained" color="inherit" onClick={handleClick}>保存</Button>
      </DialogActions>
    </Dialog>
  );
}
UserAddDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  setIsDialogOpen: PropTypes.func
};
