import axios from 'axios';

import Member from './member';

class Attendance {
  constructor(id, userId, date, type) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.type = type;
  }

  getUser({ session, userId }) {
    return Member.byId(this.userId, { session, userId });
  }

  delete({ session, userId }) {
    return axios.delete('http://localhost:8000/api/v1/attendance/', {
      data: {
        userId: userId.replace('_', ''),
        token: session,
        id: this.id,
      },
    });
  }
}

export default Attendance;
