import instance from './api';
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
    return instance.delete('/api/v1/attendance/', {
      data: {
        userId: userId.replace('_', ''),
        token: session,
        id: this.id,
      },
    });
  }

  edit(type, { session, userId }) {
    return instance.put('/api/v1/attendance/', {
      userId: userId.replace('_', ''),
      token: session,
      id: this.id,
      type,
    });
  }
}

export default Attendance;
