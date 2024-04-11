import Box from "@mui/material/Box";

import AttendanceMemberSelect from './attendance-member-select';


export default function AttendanceSelect() {

  return (
    <Box sx={{ mx: "auto", mt: 2 }}>
      <AttendanceMemberSelect />
      <AttendanceMemberSelect />
    </Box>
  )
}