import Member from './member';

// ----------------------------------------------------------------------

class Part {
  constructor(en, jp) {
    this.en = en;
    this.jp = jp;
  }

  members({ session, userId }) {
    return Member.byPart({ session, userId }, this.en);
  }

  rate({ session, userId }) {
    console.log(this.en);
    return 100;
  }
}

const Parts = [
  new Part('Fl', 'フルート'),
  new Part('Cl', 'クラリネット'),
  new Part('Wr', 'ダブルリード'),
  new Part('Sax', 'サクソフォン'),
  new Part('Tp', 'トランペット'),
  new Part('Tb', 'トロンボーン'),
  new Part('Hr', 'ホルン'),
  new Part('Bass', 'バス'),
  new Part('Per', 'パーカッション'),
];

export default Parts;
