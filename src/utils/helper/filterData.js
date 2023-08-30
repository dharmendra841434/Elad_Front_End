import dayjs from "dayjs";

export const filterData = (inputData, range, choosedDate) => {
  const currentDate = dayjs();
  let filteredData = [];

  if (range === 0) {
    filteredData = inputData.filter((data) => {
      const filterDate = dayjs(data.date);
      const diffInDays = currentDate.diff(filterDate, "day");
      return diffInDays <= 7;
    });
  } else if (range === 1) {
    filteredData = inputData.filter((data) => {
      const filterDate = dayjs(data.date);
      const diffInMonths = currentDate.diff(filterDate, "month");
      return diffInMonths <= 1;
    });
  } else if (range === 2) {
    filteredData = inputData.filter((data) => {
      const filterDate = dayjs(data.date);
      const diffInMonths = currentDate.diff(filterDate, "month");
      return diffInMonths <= 6;
    });
  } else if (range === 3) {
    filteredData = inputData.filter((data) => data.date >= choosedDate);
    return filteredData;
  }
  console.log(filteredData);
  return filteredData;
};