import PropTypes from 'prop-types';

import { Stack, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function FormSuccess({ isSuccess, resetStates }) {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" height="312px">
      {isSuccess ? (
        <>
          <Iconify icon="eva:checkmark-circle-2-fill" color="success.main" width={110} />
          <Typography variant="h4" sx={{ my: 1 }}>
            回答を記録しました！
          </Typography>
          <Typography vairant="body2">このページは閉じても構いません。</Typography>
          <Button onClick={resetStates} variant="contained" sx={{ mt: 2 }}>
            戻る
          </Button>
        </>
      ) : (
        <>
          <Iconify icon="eva:alert-circle-fill" color="error.main" width={110} />
          <Typography variant="h4" sx={{ my: 1 }}>
            エラーが発生しました
          </Typography>
          <Typography vairant="body2">時間をおいてからもう一度お試しください。</Typography>
          <Button onClick={resetStates} variant="contained" sx={{ mt: 2 }}>
            戻る
          </Button>
        </>
      )}
    </Stack>
  );
}

FormSuccess.propTypes = {
  isSuccess: PropTypes.bool,
  resetStates: PropTypes.func,
};
