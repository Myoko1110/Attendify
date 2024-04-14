import PropTypes from 'prop-types';

import { Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function FormSuccess({ isSuccess }) {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" height="256px">
      {isSuccess ? (
        <>
          <Iconify icon="eva:checkmark-circle-2-fill" color="success.main" width={128} />
          <Typography variant="h4" sx={{ my: 1 }}>
            回答を記録しました！
          </Typography>
          <Typography vairant="body2">このページは閉じても構いません。</Typography>
        </>
      ) : (
        <>
          <Iconify icon="eva:alert-circle-fill" color="error.main" width={128} />
          <Typography variant="h4" sx={{ my: 1 }}>
            エラーが発生しました
          </Typography>
          <Typography vairant="body2">時間をおいてからもう一度お試しください。</Typography>
        </>
      )}
    </Stack>
  );
}

FormSuccess.propTypes = {
  isSuccess: PropTypes.bool,
};
