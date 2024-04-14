import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select, FormLabel, FormControl } from '@mui/material';

import { parts } from '../../_mock/part';

export default function DatePartSelect({ date, part, grade, setDate, setPart, setGrade }) {
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handlePartChange = (e) => {
    setPart(e.target.value);
  };
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <Box sx={{ mt: 6, mx: 'auto' }}>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel>日付</FormLabel>
        <Select
          id="date"
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          onChange={handleDateChange}
          value={date}
          sx={{ width: 200, my: 1 }}
        >
          <MenuItem value="" disabled selected>
            選択
          </MenuItem>
          <MenuItem value="2024-04-08">4月8日</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel>パート</FormLabel>
        <Select
          id="part"
          inputProps={{ 'aria-label': 'Without label' }}
          displayEmpty
          onChange={handlePartChange}
          value={part}
          sx={{
            width: 200,
            my: 1,
          }}
        >
          <MenuItem value="" disabled selected>
            選択
          </MenuItem>
          {parts.map((row) => (
            <MenuItem value={row.name} key={row.name}>
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel>学年</FormLabel>
        <RadioGroup name="radio-buttons-group" onChange={handleGradeChange} value={grade}>
          <FormControlLabel value="High" control={<Radio />} label="高校" />
          <FormControlLabel value="Junior" control={<Radio />} label="中学" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

DatePartSelect.propTypes = {
  date: PropTypes.any,
  part: PropTypes.any,
  grade: PropTypes.any,
  setDate: PropTypes.func,
  setPart: PropTypes.func,
  setGrade: PropTypes.func,
};
