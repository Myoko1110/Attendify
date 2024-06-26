import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { grey } from '@mui/material/colors';
import {
  Stack,
  Alert,
  Dialog,
  Button,
  Snackbar,
  TextField,
  DialogTitle,
  FormControl,
  ToggleButton,
  DialogContent,
  ToggleButtonGroup,
} from '@mui/material';

import instance from 'src/utils/api';

import { info, error, success, warning } from 'src/theme/palette';

import Iconify from 'src/components/iconify';

export default function EditScheduleDialog({
  isOpen,
  setIsOpen,
  date,
  scheduleType,
  updateSchedules,
}) {
  const [addSuccessSnackbarOpen, setAddSuccessSnackbarOpen] = useState(false);
  const [addErrorSnackbarOpen, setAddErrorSnackbarOpen] = useState(false);
  const [deleteSuccessSnackbarOpen, setDeleteSuccessSnackbarOpen] = useState(false);
  const [deleteErrorSnackbarOpen, setDeleteErrorSnackbarOpen] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [schedule, setSchedule] = useState('');
  const [otherField, setOtherField] = useState('');

  const [cookies] = useCookies(['']);

  const resetInputs = () => {
    setIsError(false);
    setOtherField('');
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (!schedule) {
      setIsError(true);
      setIsReserved(false);
    } else {
      setIsError(false);
      setIsReserved(false);

      let sendSchedule = schedule;
      if (schedule === 'OTHER') {
        if (
          otherField === 'WEEKDAY' ||
          otherField === 'MORNING' ||
          otherField === 'AFTERNOON' ||
          otherField === 'ALLDAY' ||
          otherField === 'OTHER'
        ) {
          setIsReserved(true);
          setIsError(false);
          return;
        }

        sendSchedule = otherField;
      }

      const { session, userId } = cookies;
      instance
        .put('/api/v1/schedule/', {
          userId: userId.replace('_', ''),
          token: session,
          date: Number(date.getTime() / 1000),
          scheduleType: sendSchedule,
        })
        .then(() => {
          setIsOpen(false);
          resetInputs();
          setAddSuccessSnackbarOpen(true);

          updateSchedules();
        })
        .catch(() => {
          setIsOpen();
          setAddErrorSnackbarOpen(true);
        });
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setIsError(false);

    const { session, userId } = cookies;
    instance
      .delete('/api/v1/schedule/', {
        data: {
          userId: userId.replace('_', ''),
          token: session,
          date: Number(date.getTime() / 1000),
        },
      })
      .then(() => {
        setIsOpen(false);
        resetInputs();
        setDeleteSuccessSnackbarOpen(true);

        updateSchedules();
      })
      .catch(() => {
        setIsOpen();
        setDeleteErrorSnackbarOpen(true);
      });
  };

  const handleChancelClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSchedule('');
      setIsError(false);
      setIsReserved(false);
    }, 200);
  };

  const handleSuccessSnackbarClose = () => {
    setAddSuccessSnackbarOpen(false);
  };
  const handleErrorSnackbarClose = () => {
    setAddErrorSnackbarOpen(false);
  };

  useEffect(() => {
    setSchedule(scheduleType.en);
    if (scheduleType.en === 'OTHER') {
      setOtherField(scheduleType.jp);
    }
  }, [date, scheduleType]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleChancelClick}
        sx={{
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '444px',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle sx={{ padding: '24px' }}>
          {date.getMonth() + 1}月{date.getDate()}日の予定を編集
        </DialogTitle>
        <form onSubmit={handleSaveClick}>
          <DialogContent sx={{ paddingTop: '10px!important' }}>
            <Stack direction="column" gap="24px">
              {isError && <Alert severity="error">未入力の項目があります。</Alert>}
              {isReserved && <Alert severity="error">この値は使用できません。</Alert>}
              <FormControl>
                <ToggleButtonGroup
                  variant="outlined"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  exclusive
                  fullWidth
                >
                  <ToggleButton
                    value="WEEKDAY"
                    sx={{
                      bgcolor: info.lighter,
                      '&:hover': { bgcolor: info.light },
                      '&.Mui-selected': {
                        bgcolor: info.main,
                        color: 'white',
                        '&:hover': { bgcolor: info.main },
                      },
                    }}
                  >
                    平日練習
                  </ToggleButton>
                  <ToggleButton
                    value="MORNING"
                    sx={{
                      bgcolor: success.lighter,
                      '&:hover': { bgcolor: success.light },
                      '&.Mui-selected': {
                        bgcolor: success.main,
                        color: 'white',
                        '&:hover': { bgcolor: success.main },
                      },
                    }}
                  >
                    午前練習
                  </ToggleButton>
                  <ToggleButton
                    value="AFTERNOON"
                    sx={{
                      bgcolor: warning.lighter,
                      '&:hover': { bgcolor: warning.light },
                      '&.Mui-selected': {
                        bgcolor: warning.main,
                        color: 'white',
                        '&:hover': { bgcolor: warning.main },
                      },
                    }}
                  >
                    午後練習
                  </ToggleButton>
                  <ToggleButton
                    value="ALLDAY"
                    sx={{
                      bgcolor: error.lighter,
                      '&:hover': { bgcolor: error.light },
                      '&.Mui-selected': {
                        bgcolor: error.main,
                        color: 'white',
                        '&:hover': { bgcolor: error.main },
                      },
                    }}
                  >
                    一日練習
                  </ToggleButton>
                  <ToggleButton
                    value="OTHER"
                    sx={{
                      bgcolor: grey[200],
                      '&:hover': { bgcolor: grey[300] },
                      '&.Mui-selected': {
                        bgcolor: grey[800],
                        color: 'white',
                        '&:hover': { bgcolor: grey[800] },
                      },
                    }}
                  >
                    その他
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>
              {schedule === 'OTHER' && (
                <FormControl>
                  <TextField
                    value={otherField}
                    onChange={(e) => setOtherField(e.target.value)}
                    variant="standard"
                    placeholder="その他を入力してください"
                  />
                </FormControl>
              )}
            </Stack>
          </DialogContent>
          <Stack direction="row" gap="8px" justifyContent="space-between" sx={{ p: '24px' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              削除
            </Button>
            <Stack gap="8px" direction="row">
              <Button variant="outlined" color="inherit" onClick={handleChancelClick}>
                キャンセル
              </Button>
              <Button variant="contained" color="inherit" type="submit">
                保存
              </Button>
            </Stack>
          </Stack>
        </form>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addSuccessSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSuccessSnackbarClose}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleSuccessSnackbarClose}
        >
          予定を追加しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={addErrorSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleErrorSnackbarClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={handleErrorSnackbarClose}
        >
          予定の登録に失敗しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={deleteSuccessSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setDeleteSuccessSnackbarOpen(false)}
      >
        <Alert
          severity="success"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={() => setDeleteSuccessSnackbarOpen(false)}
        >
          予定を削除しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={deleteErrorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setDeleteErrorSnackbarOpen(false)}
      >
        <Alert
          severity="error"
          variant="outlined"
          sx={{ bgcolor: 'background.paper' }}
          onClose={() => setDeleteErrorSnackbarOpen(false)}
        >
          予定の登録に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}
EditScheduleDialog.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  date: PropTypes.any,
  scheduleType: PropTypes.any,
  updateSchedules: PropTypes.func,
};
