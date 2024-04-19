class Grade {
  constructor(en, jp, jpOmitted) {
    this.en = en;
    this.jp = jp;
    this.jpOmitted = jpOmitted;
  }

  get [Symbol.toStringTag]() {
    return this.en;
  }
}

const Grades = {
  High3: new Grade('High3', '高校3年生', '高3'),
  High2: new Grade('High2', '高校2年生', '高2'),
  High1: new Grade('High1', '高校1年生', '高1'),
  Junior3: new Grade('Junior3', '中学3年生', '中3'),
  Junior2: new Grade('Junior2', '中学2年生', '中2'),
  Junior1: new Grade('Junior1', '中学1年生', '中1'),
};

export default Grades;
