import Grades from './grade';
import instance from './api';

export default class Member {
  constructor(id, lastName, firstName, part, grade) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.part = part;
    this.grade = grade;
  }

  static all({ userId, session }) {
    return instance
      .get('/api/v1/member/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((res) =>
        res.data.members.map(
          (i) => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])
        )
      );
  }

  static byPart(part, { userId, session }) {
    return instance
      .get('/api/v1/member/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
          part,
        },
      })
      .then((res) =>
        res.data.members.map(
          (i) => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])
        )
      );
  }

  static byGrade(grade, { userId, session }) {
    return instance
      .get('/api/v1/member/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
          grade,
        },
      })
      .then((res) =>
        res.data.members.map(
          (i) => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])
        )
      );
  }

  static byPartAndGrade(part, grade, { userId, session }) {
    return instance
      .get('/api/v1/member/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
          part,
          grade,
        },
      })
      .then((res) =>
        res.data.members.map(
          (i) => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])
        )
      );
  }

  static byId(id, { userId, session }) {
    return instance
      .get('/api/v1/member/', {
        params: {
          userId: userId.replace('_', ''),
          token: session,
          id,
        },
      })
      .then(
        (res) =>
          new Member(
            res.data.member.id,
            res.data.member.lastName,
            res.data.member.firstName,
            res.data.member.part,
            Grades[res.data.member.grade]
          )
      );
  }
}
