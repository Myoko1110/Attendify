class Grade {
  constructor(en, enOmitted, jp, jpOmitted, num) {
    this.en = en;
    this.enOmitted = enOmitted;
    this.jp = jp;
    this.jpOmitted = jpOmitted;
    this.num = num;
  }

  get [Symbol.toStringTag]() {
    return this.en;
  }
}

const Grades = {
  High3: new Grade('High3', 'h3', '高校3年生', '高3', 6),
  High2: new Grade('High2', 'h2', '高校2年生', '高2', 5),
  High1: new Grade('High1', 'h1', '高校1年生', '高1', 4),
  Junior3: new Grade('Junior3', 'j3', '中学3年生', '中3', 3),
  Junior2: new Grade('Junior2', 'j2', '中学2年生', '中2', 2),
  Junior1: new Grade('Junior1', 'j1', '中学1年生', '中1', 1),
};

export default Grades;
