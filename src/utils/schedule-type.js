export default class ScheduleType {
  constructor(type) {
    switch (type) {
      case 'WEEKDAY':
        this.jp = '平日練習';
        this.en = type;
        this.color = '#C2EEF6';
        this.textColor = '#005868';
        break;

      case 'MORNING':
        this.jp = '午前練習';
        this.en = type;
        this.color = '#C2EADD';
        this.textColor = '#005035';
        break;

      case 'AFTERNOON':
        this.jp = '午後練習';
        this.en = type;
        this.color = '#FFEBC2';
        this.textColor = '#7A5200';
        break;

      case 'ALLDAY':
        this.jp = '一日練習';
        this.en = type;
        this.color = '#FFD7CE';
        this.textColor = '#7A2917';
        break;

      default:
        this.jp = type;
        this.en = 'OTHER';
        this.color = '#C2CFDB';
        this.textColor = '#001A32';
        break;
    }
  }

  export() {
    if (this.en !== "OTHER") {
      return this.en;
    }
    return this.jp;
  }
}