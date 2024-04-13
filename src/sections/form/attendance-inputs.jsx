import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

import Box from "@mui/material/Box";

import { getMembers } from '../../_mock/user';
import AttendanceMemberSelect from './attendance-member-select';


export default function AttendanceSelect({
  part,
  grade,
                                         }) {
  const [cookies,] = useCookies(["status", ""]);

  const [members,] = useState(getMembers(cookies.userId, cookies.session, part, grade));

  return (
    <Box sx={{ mx: "auto", mt: 2 }}>
      {
        members.map(row => (
          <AttendanceMemberSelect email={row.email} lastName={row.lastName} firstName={row.firstName} />
        ))
      }

    </Box>
  )
}
AttendanceSelect.propTypes = {
  part: PropTypes.string,
  grade: PropTypes.string,
}
