export function getMembers(userId, token, part=null, grade=null) {
  const XHR = new XMLHttpRequest();

  let url = `http://localhost:8000/api/v1/member/?userId=${userId.replace("_", "")}&token=${token}`;
  if (part) url += `&part=${part}`;
  if (grade) url += `&grade=${grade}`;

  XHR.open("GET", url, false)
  XHR.send();

  if (XHR.status !== 200) {
    return false;
  }
  const res = JSON.parse(XHR.response);
  return res.members;
}
