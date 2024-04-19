import axios from 'axios';

export function checkSession(userId, token) {

  const XHR = new XMLHttpRequest();
  XHR.open("GET", `http://localhost:8000/api/v1/auth/session/?userId=${userId.replace("_", "")}&token=${token}`, false)
  XHR.send();

  if (XHR.status !== 200) {
    return [false, null];
  }
  const res = JSON.parse(XHR.response);
  if (!res.session){
    return [false, null];
  }
  return [true, res.type]
}

export function checksession({userId, session}) {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/api/v1/auth/session/", {
      params: {
        userId: userId.replace("_", ""),
        token: session,
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.session) {
          resolve(res.data.type)
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
}
