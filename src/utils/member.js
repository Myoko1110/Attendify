import axios from 'axios';

import Grades from './grade';

export default class Member {
  constructor(id, lastName, firstName, part, grade) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.part = part;
    this.grade = grade;
  }

  get rate() {
    console.log(this.id);
    return 100;
  }

  static all({ userId, session }) {
    return axios.get('http://localhost:8000/api/v1/member/', {
      params: {
        userId: userId.replace('_', ''),
        token: session,
      },
    })
      .then((res) => res.data.members.map(i => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])))
      .catch(err => err);
  }

  static byPart(part, { userId, session }) {
    return axios.get('http://localhost:8000/api/v1/member/', {
      params: {
        userId: userId.replace('_', ''),
        token: session,
        part,
      },
    })
      .then((res) => res.data.members.map(i => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])))
      .catch(err => err);
  }

  static byGrade(grade, { userId, session }) {
    return axios.get('http://localhost:8000/api/v1/member/', {
      params: {
        userId: userId.replace('_', ''),
        token: session,
        grade,
      },
    })
      .then((res) => res.data.members.map(i => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])))
      .catch(err => err);
  }

  static byPartAndGrade(part, grade, { userId, session }) {
    return axios.get('http://localhost:8000/api/v1/member/', {
      params: {
        userId: userId.replace('_', ''),
        token: session,
        part,
        grade,
      },
    })
      .then((res) => res.data.members.map(i => new Member(i.id, i.lastName, i.firstName, i.part, Grades[i.grade])))
      .catch(err => err);
  }
}
