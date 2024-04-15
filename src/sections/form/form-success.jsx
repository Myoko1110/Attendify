import PropTypes from 'prop-types';

import { Stack, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

export default function FormSuccess({ isSuccess }) {
  const router = useRouter();

  const handleClick = () => {
    router.replace('/form');
  };

  return (
    <Stack direction="column" alignItems="center" justifyContent="center" height="256px">
      {isSuccess ? (
        <>
          <Iconify icon="eva:checkmark-circle-2-fill" color="success.main" width={128} />
          <Typography variant="h4" sx={{ my: 1 }}>
            回答を記録しました！
          </Typography>
          <Typography vairant="body2">このページは閉じても構いません。</Typography>
          <Button onClick={handleClick}>戻る</Button>
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
