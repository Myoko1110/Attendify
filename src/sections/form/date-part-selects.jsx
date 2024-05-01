import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select, FormLabel, FormControl } from '@mui/material';

import Parts from '../../utils/part';

export default function DatePartSelects({ date, part, grade, dates, setDate, setPart, setGrade }) {
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handlePartChange = (e) => {
    setPart(e.target.value);
  };
  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  return (
    <Box sx={{ mt: 6, mx: 'auto' }}>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel sx={{ fontSize: '15px', color: '#000000' }}>日付</FormLabel>
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
          {dates.map((row, i) => (
            <MenuItem key={i} value={row}>
              {row.getMonth() + 1}月{row.getDate()}日
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel sx={{ fontSize: '15px', color: '#000000' }}>パート</FormLabel>
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
          {Parts.map((row) => (
            <MenuItem value={row.en} key={row.en}>
              {row.en}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <FormLabel sx={{ fontSize: '15px', color: '#000000' }}>学年</FormLabel>
        <RadioGroup name="radio-buttons-group" onChange={handleGradeChange} value={grade}>
          <FormControlLabel value="High" control={<Radio />} label="高校" />
          <FormControlLabel value="Junior" control={<Radio />} label="中学" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

DatePartSelects.propTypes = {
  date: PropTypes.any,
  part: PropTypes.any,
  grade: PropTypes.any,
  dates: PropTypes.array,
  setDate: PropTypes.func,
  setPart: PropTypes.func,
  setGrade: PropTypes.func,
};
