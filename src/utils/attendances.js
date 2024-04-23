import axios from 'axios';
import Decimal from 'decimal.js';

import Attendance from './attendance';

class Attendances extends Array {
  /**
   * 出席率(出席情報がない場合はnull)
   * @returns {number|null}
   */
  get rate() {
    let count = this.length;
    if (count === 0) return null;

    let total = 0;
    this.forEach((i) => {
      if (i.type === '出席') total += 100;
      else if (i.type === '欠席') {
        /* empty */
      } else if (i.type === '遅刻' || i.type === '早退') total += 50;
      else if (i.type === '講習' || i.type === '出停' || i.type === '学閉') count -= 1;
      else count -= 1;
    });

    if (count === 0) return 0;

    return new Decimal(total).div(new Decimal(count)).mul(100).round().div(100).toNumber();
  }

  toMonthList() {
    const dateList = {};
    this.forEach((i) => {
      const month = i.date.getMonth() + 1;
      if (!(month in dateList)) {
        dateList[month] = new Attendances();
      }
      dateList[month].push(i);
    });

    return dateList;
  }

  toDateList() {
    const dateList = {};
    this.forEach((i) => {
      const date = i.date.getDate();
      if (!(date in dateList)) {
        dateList[date] = new Attendances();
      }
      dateList[date].push(i);
    });

    return dateList;
  }

  /**
   * 今月の出欠情報
   * @returns {Attendances}
   */
  get thisMonth() {
    const currentYearMonth = new Date().toISOString().slice(0, 7);
    return new Attendances(
      ...this.filter((i) => i.date.toISOString().slice(0, 7) === currentYearMonth)
    );
  }

  get today() {
    return this.filter((i) => i.date.toDateString() === new Date().toDateString());
  }

  /**
   * 日付から出欠情報を取得します
   * @param date - Date
   * @returns {Attendances}
   */
  byDate(date) {
    return new Attendances(...this.filter((i) => i.date.toDateString() === date.toDateString()));
  }

  /**
   * 出席数
   * @returns {number}
   */
  get attendanceCount() {
    return this.filter((i) => i.type === '出席').length;
  }

  /**
   * 欠席数
   * @returns {number}
   */
  get absenceCount() {
    return this.filter((i) => i.type === '欠席').length;
  }

  /**
   * 遅刻数
   * @returns {number}
   */
  get tardinessCount() {
    return this.filter((i) => i.type === '遅刻').length;
  }

  /**
   * 早退数
   * @returns {number}
   */
  get earlyDepartureCount() {
    return this.filter((i) => i.type === '早退').length;
  }

  /**
   * その他数
   * @returns {number}
   */
  get othersCount() {
    return this.filter(
      (i) => i.type !== '出席' && i.type !== '欠席' && i.type !== '遅刻' && i.type !== '早退'
    ).length;
  }

  /**
   * 部員から出欠情報を取得します
   * @param id - 部員ID
   * @param userId - 取得に使用するuserId
   * @param session - 取得に使用するsessionToken
   * @returns {Promise<Attendances>}
   */
  static byMember(id, { userId, session }) {
    return axios
      .get(`http://localhost:8000/api/v1/attendance/member/${id}`, {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(
        (res) =>
          new Attendances(
            ...res.data.attendances.map(
              (i) => new Attendance(i.id, i.userId, new Date(i.date * 1000), i.type)
            )
          )
      );
  }

  /**
   * パートから出欠情報を取得します
   * @param part - パート
   * @param userId - 取得に使用するuserId
   * @param session - 取得に使用するsessionToken
   * @returns {Promise<Attendances>}
   */
  static byPart(part, { userId, session }) {
    return axios
      .get(`http://localhost:8000/api/v1/attendance/part/${part}`, {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(
        (res) =>
          new Attendances(
            ...res.data.attendances.map(
              (i) => new Attendance(i.id, i.userId, new Date(i.date * 1000), i.type)
            )
          )
      );
  }

  /**
   * すべての出欠情報を取得します
   * @param userId - 取得に使用するuserId
   * @param session - 取得に使用するsessionToken
   * @returns {Promise<Attendances>}
   */
  static all({ userId, session }) {
    return axios
      .get(`http://localhost:8000/api/v1/attendance/`, {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then(
        (res) =>
          new Attendances(
            ...res.data.attendances.map(
              (i) => new Attendance(i.id, i.userId, new Date(i.date * 1000), i.type)
            )
          )
      )
      .catch((err) => err);
  }
}

export default Attendances;
