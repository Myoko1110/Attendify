import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

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
  DialogActions,
  ToggleButtonGroup,
} from '@mui/material';

import { info, error, success, warning } from 'src/theme/palette';

import Schedule from '../../utils/schedule';
import ScheduleType from '../../utils/schedule-type';

export default function AddScheduleDialog({ isOpen, setIsOpen, date, setEvents }) {
  const [schedule, setSchedule] = useState('');
  const [isOther, setIsOther] = useState(false);
  const [otherSchedule, setOtherSchedule] = useState('');

  const [addSuccessSnackbarOpen, setAddSuccessSnackbarOpen] = useState(false);
  const [addErrorSnackbarOpen, setAddErrorSnackbarOpen] = useState(false);

  const [isError, setIsError] = useState(false);

  const [cookies] = useCookies(['']);

  const resetInputs = () => {
    setIsError(false);
    setSchedule('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!schedule) {
      setIsError(true);
    } else {
      let scheduleType;
      if (isOther) {
        if (!otherSchedule) {
          setIsError(true);
          return;
        }
        scheduleType = otherSchedule;
      } else {
        scheduleType = schedule;
      }

      const s = new Schedule(date, new ScheduleType(scheduleType));
      s.add(cookies)
        .then(() => {
          setEvents((pre) => [
            ...pre,
            {
              start: date,
              title: s.type.jp,
              color: s.type.color,
              textColor: s.type.textColor,
              allDay: true,
              extendedProps: {
                type: s.type,
              },
            },
          ]);
          setIsOpen(false);
          setAddSuccessSnackbarOpen(true);
        })
        .catch(() => {
          setIsOpen(false);
          setAddErrorSnackbarOpen(true);
        });

      resetInputs();
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
    setIsOther(e.target.value === 'OTHER');
  };

  const handleChancelClick = () => {
    setIsOpen(false);
    resetInputs();
  };

  const handleSuccessSnackbarClose = () => {
    setAddSuccessSnackbarOpen(false);
  };
  const handleErrorSnackbarClose = () => {
    setAddErrorSnackbarOpen(false);
  };

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
          {date.getMonth() + 1}月{date.getDate()}日の予定を追加
        </DialogTitle>
        <form onSubmit={handleClick}>
          <DialogContent sx={{ paddingTop: '10px!important' }}>
            <Stack direction="column" gap="24px">
              {isError && <Alert severity="error">未入力の項目があります。</Alert>}
              <FormControl>
                <ToggleButtonGroup
                  variant="outlined"
                  value={schedule}
                  onChange={handleScheduleChange}
                  fullWidth
                >
                  <ToggleButton
                    value="WEEKDAY"
                    sx={{
                      bgcolor: info.lightest,
                      '&:hover': { bgcolor: info.lighter },
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
                      bgcolor: success.lightest,
                      '&:hover': { bgcolor: success.lighter },
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
                      bgcolor: warning.lightest,
                      '&:hover': { bgcolor: warning.lighter },
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
                      bgcolor: error.lightest,
                      '&:hover': { bgcolor: error.lighter },
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
              {isOther && (
                <FormControl>
                  <TextField
                    value={otherSchedule}
                    onChange={(e) => setOtherSchedule(e.target.value)}
                    variant="standard"
                    placeholder="その他を入力してください"
                  />
                </FormControl>
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: '24px' }}>
            <Button variant="outlined" color="inherit" onClick={handleChancelClick}>
              キャンセル
            </Button>
            <Button variant="contained" color="inherit" type="submit">
              保存
            </Button>
          </DialogActions>
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
          部員を追加しました。
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
          追加に失敗しました。
        </Alert>
      </Snackbar>
    </>
  );
}
AddScheduleDialog.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  date: PropTypes.any,
  setEvents: PropTypes.func,
};
