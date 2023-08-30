import dayjs from "dayjs";

// function to show relative date
export function dateFormat(inputDate) {
  const date = dayjs(inputDate);
  const today = dayjs();
  let outputDate = date.format("DD MMMM, YYYY, hh:mm A");

  if (dayjs(date).format("DD/MM/YYYY") === dayjs(today).format("DD/MM/YYYY")) {
    outputDate = `Today at ${date.format("hh:mm A")}`;
  } else if (
    dayjs(date).format("DD/MM/YYYY") ===
    dayjs(today).subtract(1, "day").format("DD/MM/YYYY")
  ) {
    outputDate = `Yesterday at ${date.format("hh:mm A")}`;
  } else {
    outputDate = date.format("DD MMMM, YYYY, hh:mm A");
  }
  return outputDate;
}
