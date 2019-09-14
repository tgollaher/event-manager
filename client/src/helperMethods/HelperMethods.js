export const formatDate = (d) => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
  
    return `${YYYY}-${MM}-${DD}`;
  };


//   Code from:
//   https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format

