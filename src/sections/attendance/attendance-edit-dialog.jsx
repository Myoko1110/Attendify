import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import Attendance from 'src/utils/attendance';

export default function AttendanceEditDialog({
  isOpen,
  setIsOpen,
  attendance,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const [cookies] = useCookies(['']);
  const [type, setType] = useState(null);
  const [other, setOther] = useState('');

  const reset = () => {
    if (!['出席', '欠席', '遅刻', '早退', '講習', '出停', '学閉'].includes(attendance.type)) {
      setType('その他');
      setOther(attendance.type);
    } else {
      setType(attendance.type);
    }
  };

  const handleClick = () => {
    let attendanceType;
    if (type === 'その他') {
      attendanceType = other;
    } else {
      attendanceType = type;
    }

    attendance
      .edit(attendanceType, cookies)
      .then(() => {
        setIsOpen(false);
        attendance.type = attendanceType;
        setEditSuccessOpen(true);
      })
      .catch(() => {
        setEditErrorOpen(true);
      });
  };

  const handleChange = (e) => {
    setType(e.target.value);
    if (e.target.value !== 'その他') {
      setOther('');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);

    setTimeout(() => {
      reset();
    }, 300);
  };

  useState(() => {
    reset();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={handleCancel}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '16px',
        },
      }}
    >
      <DialogTitle>出欠情報の編集</DialogTitle>
      <DialogContent>
        <Stack direction="column" alignItems="center">
          <Select
            id="date"
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue=""
            displayEmpty
            sx={{ width: 200, my: 1 }}
            value={type}
            onChange={handleChange}
          >
            <MenuItem value="" disabled selected>
              選択
            </MenuItem>
            <MenuItem value="出席">出席</MenuItem>
            <MenuItem value="欠席">欠席</MenuItem>
            <MenuItem value="遅刻">遅刻</MenuItem>
            <MenuItem value="早退">早退</MenuItem>
            <MenuItem value="講習">講習</MenuItem>
            <MenuItem value="出停">出席停止</MenuItem>
            <MenuItem value="学閉">学級閉鎖</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </Select>
          {type === 'その他' && (
            <TextField
              type="text"
              variant="standard"
              placeholder="入力してください"
              InputLabelProps={{ shrink: true }}
              sx={{ ml: 2, fontSize: '16px' }}
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: '24px' }}>
        <Button onClick={handleCancel} variant="outlined" color="inherit">
          キャンセル
        </Button>
        <Button onClick={handleClick} variant="contained" color="inherit" autoFocus>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AttendanceEditDialog.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  attendance: PropTypes.instanceOf(Attendance),
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
