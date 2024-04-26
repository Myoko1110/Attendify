import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'ホーム',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: '出欠',
    path: '/attendance',
    icon: icon('ic_analytics'),
  },
  {
    title: '部員',
    path: '/members',
    icon: icon('ic_user'),
  },
  {
    title: 'パート',
    path: '/parts',
    icon: icon('ic_music'),
  },
  {
    title: '予定',
    path: '/schedule',
    icon: icon('ic_calendar'),
  },
  {
    title: 'フォーム',
    path: '/form',
    icon: icon('ic_docs'),
  },
];

export default navConfig;
