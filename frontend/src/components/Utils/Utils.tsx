export const capitalizedFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizedFirstLetterOfEveryWord = (text: string): string => {
  const arr = text.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(' ');
};

const convertMonthNumberToWord = (month: string) => {
  switch (month) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return month;
  }
};

export const convertNewDateToDisplay = (newdate: string): string => {
  let wholeString = newdate.split('-');
  let year = wholeString && wholeString[0];
  let month = wholeString && wholeString[1];
  let monthWord = convertMonthNumberToWord(month);
  let date = wholeString && wholeString[2].substring(0, 2);

  return `${date} ${monthWord} ${year}`;
};

export const displaysTwoDecimalPlaces = (item: string | number): string => {
  return Number(item).toFixed(2);
};
