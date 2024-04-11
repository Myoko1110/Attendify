import { useState } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { Select, FormLabel, TextField, FormControl } from '@mui/material';

export default function AttendanceMemberSelect() {
  const [isOther, setIsOther] = useState(false);
  const [attendance, setAttendance] = useState("");
  const [attendanceValue, setAttendanceValue] = useState("");
  const [otherValue, setOtherValue] = useState("");

  const handleChange = (e) => {
    setAttendanceValue(e.target.value);
    if (e.target.value === "その他") {
      setIsOther(true);
      setAttendance("");
    } else {
      setIsOther(false);
      setAttendance(e.target.value);
    }
  };

  const handleFieldChange = (e) => {
    setOtherValue(e.target.value);
    if (isOther) {
      setAttendance(e.target.value);
    }
  }

  console.log(attendance)

  return (
    <FormControl fullWidth sx={{ my: 1 }}>
      <FormLabel required sx={{fontSize: "15px"}}>藤森大起</FormLabel>
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
          <MenuItem value="" disabled selected>選択</MenuItem>
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
            InputLabelProps={{shrink: true}}
            sx={{ml: 2, fontSize: "16px"}}
            value={otherValue}
            onChange={handleFieldChange}
          />
        )}
      </Stack>
    </FormControl>
  );

}
