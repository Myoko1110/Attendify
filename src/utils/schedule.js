import instance from './api';
import ScheduleType from './schedule-type';

export default class Schedule {
  constructor(date, type) {
    this.date = date;
    this.type = type;
  }

  add({ userId, session }) {
    return instance
      .post('/api/v1/schedule/', {
        userId: userId.replace('_', ''),
        token: session,
        date: Number(this.date.getTime() / 1000),
        scheduleType: this.type.export(),
      })
      .then((res) => res);
  }

  static all({ userId, session }) {
    return instance
      .get('/api/v1/schedule/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((res) =>
        res.data.schedules.map(
          (i) => new Schedule(new Date(i.date), new ScheduleType(i.scheduleType))
        )
      );
  }
}
