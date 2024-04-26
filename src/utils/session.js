import instance from './api';

export function checkSession({ userId, session }) {
  return new Promise((resolve, reject) => {
    instance
      .get('/api/v1/auth/session/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((res) => {
        if (res.data.session) {
          resolve(res.data.type);
        } else {
          resolve(false);
        }
      });
  });
}
