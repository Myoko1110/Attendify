import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { Select, FormLabel, TextField, FormControl } from '@mui/material';

export default function AttendanceMemberSelect({ id, lastName, firstName, setAttendances }) {
  const [isOther, setIsOther] = useState(false);
  const [attendanceValue, setAttendanceValue] = useState('');
  const [otherValue, setOtherValue] = useState('');

  const handleChange = (e) => {
    setAttendanceValue(e.target.value);
    if (e.target.value === 'その他') {
      setIsOther(true);
    } else {
      setIsOther(false);
      setOtherValue('');
      setAttendance(e.target.value);
    }
  };

  const handleFieldChange = (e) => {
    setOtherValue(e.target.value);
    if (isOther) {
      setAttendance(e.target.value);
    }
  };

  const setAttendance = (value) => {
    setAttendances((pre) => ({
      ...pre,
      [id]: value,
    }));
  };

  useEffect(() => {
    setAttendance(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <FormLabel sx={{ fontSize: '15px', color: '#000000' }}>
        {lastName} {firstName}
      </FormLabel>
      <Stack direction="row" alignItems="center">
        <Select
          id="date"
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue=""
          displayEmpty
          sx={{ width: 200, my: 1 }}
          value={attendanceValue}
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
        {isOther && (
          <TextField
            type="text"
            variant="standard"
            placeholder="入力してください"
            InputLabelProps={{ shrink: true }}
            sx={{ ml: 2, fontSize: '16px' }}
            value={otherValue}
            onChange={handleFieldChange}
          />
        )}
      </Stack>
    </FormControl>
  );
}

AttendanceMemberSelect.propTypes = {
  id: PropTypes.number,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  setAttendances: PropTypes.func,
};
