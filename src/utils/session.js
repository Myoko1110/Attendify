import axios from 'axios';

export function checkSession({userId, session}) {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/api/v1/auth/session/", {
      params: {
        userId: userId.replace("_", ""),
        token: session,
      }
    })
      .then(res => {
        if (res.data.session) {
          resolve(res.data.type)
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}
