export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getMemberComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => {
        if (orderBy === 'name') return descendingNameComparator(a, b);
        if (orderBy === 'part') return descendingPartComparator(a, b);
        if (orderBy === 'rate') return descendingRateComparator(a, b);
        return descendingComparator(a, b, orderBy);
      }
    : (a, b) => {
        if (orderBy === 'name') return -descendingNameComparator(a, b);
        if (orderBy === 'part') return -descendingPartComparator(a, b);
        if (orderBy === 'rate') return -descendingRateComparator(a, b);
        return -descendingComparator(a, b, orderBy);
      };
}

function descendingNameComparator(a, b) {
  if (`${a.lastName}${a.firstName}` === null) {
    return 1;
  }
  if (`${b.lastName}${b.firstName}` === null) {
    return -1;
  }
  if (`${b.lastName}${b.firstName}` < `${a.lastName}${a.firstName}`) {
    return -1;
  }
  if (`${b.lastName}${b.firstName}` > `${a.lastName}${a.firstName}`) {
    return 1;
  }
  return 0;
}

function descendingRateComparator(a, b) {
  if (a.rate === null) {
    return 1;
  }
  if (b.rate === null) {
    return -1;
  }
  if (b.rate < a.rate) {
    return -1;
  }
  if (b.rate > a.rate) {
    return 1;
  }
  return 0;
}

const partList = ['Fl', 'Cl', 'Wr', 'Sax', 'Tp', 'Tb', 'Hr', 'Bass', 'Per'];
function descendingPartComparator(a, b) {
  const aIndex = partList.indexOf(a.part);
  const bIndex = partList.indexOf(b.part);

  if (aIndex === -1) {
    return 1;
  }
  if (bIndex === -1) {
    return -1;
  }

  if (aIndex === bIndex) {
    if (b.grade.num > a.grade.num) {
      return -1;
    }
    return 1;
  }

  if (bIndex < aIndex) {
    return -1;
  }
  if (bIndex > aIndex) {
    return 1;
  }
  return 0;
}

export function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter((user) => {
      if (`${user.lastName}${user.firstName}`.indexOf(filterName.toLowerCase()) !== -1) return true;
      return `${user.lastName} ${user.firstName}`.indexOf(filterName.toLowerCase()) !== -1;
    });
  }

  return inputData;
}
