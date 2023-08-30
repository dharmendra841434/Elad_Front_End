import dayjs from "dayjs";
import React, { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";

// calendar
const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }
  return arrayOfDate;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// function to check current month and date
// helpfull in change bg and text color
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar(props) {
  const { setShowDatePickerC, setChoosedDateC } = props;

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  //month filter
  const [isOpenMonth, setIsOpenMonth] = useState(false);
  const monthHandler = (value) => {
    setToday(today.month(value));
  };

  //year filter
  const years = [
    { yearsValue: today.year() - 10, yearsIndex: -10 },
    { yearsValue: today.year() - 9, yearsIndex: -9 },
    { yearsValue: today.year() - 8, yearsIndex: -8 },
    { yearsValue: today.year() - 7, yearsIndex: -7 },
    { yearsValue: today.year() - 6, yearsIndex: -6 },
    { yearsValue: today.year() - 5, yearsIndex: -5 },
    { yearsValue: today.year() - 4, yearsIndex: -4 },
    { yearsValue: today.year() - 3, yearsIndex: -3 },
    { yearsValue: today.year() - 2, yearsIndex: -2 },
    { yearsValue: today.year() - 1, yearsIndex: -1 },
    { yearsValue: today.year() + 0, yearsIndex: 0 },
    { yearsValue: today.year() + 1, yearsIndex: 1 },
    { yearsValue: today.year() + 2, yearsIndex: 2 },
    { yearsValue: today.year() + 3, yearsIndex: 3 },
    { yearsValue: today.year() + 4, yearsIndex: 4 },
    { yearsValue: today.year() + 5, yearsIndex: 5 },
    { yearsValue: today.year() + 6, yearsIndex: 6 },
    { yearsValue: today.year() + 7, yearsIndex: 7 },
    { yearsValue: today.year() + 8, yearsIndex: 8 },
    { yearsValue: today.year() + 9, yearsIndex: 9 },
    { yearsValue: today.year() + 10, yearsIndex: 10 },
  ];

  const [isOpenYear, setIsOpenYear] = useState(false);
  const yearHandler = (value) => {
    setToday(today.year(today.year() + value));
  };

  const chooseDateHandler = (value) => {
    setShowDatePickerC(false);
    setChoosedDateC(dayjs(selectDate.toDate().toDateString()).format('YYYY-MM-DD HH:mm'));
  }

  return (
    <div className="absolute inset-x-0 flex justify-center items-center">
      <div
        className={`absolute mt-[18rem] md:mt-[20rem] mr-[-8%] md:mr-[25%] p-2 md:p-3
         w-[320px] md:w-[424px] h-[380] md:h-[400px] shadow-xl rounded-lg z-20 bg-[#FFFFFF]`}
      >
        <div className="">
          <div className="flex items-center justify-between ">
            <button
              className="md:px-5 ml-5 md:ml-0"
              onClick={() => {
                setIsOpenMonth(false);
                setIsOpenYear(false);
              }}
            >
              <GrFormPrevious
                className="w-6 h-8 cursor-pointer hover:scale-110 transition-all md:mr-5"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
            </button>

            <div className="flex ">
              {/* month filter started */}
              <div className="relative">
                <button
                  onClick={() => setIsOpenMonth(!isOpenMonth)}
                  className="cursor-pointer text-[#131A29] flex justify-center gap-2 mt-1  h-[32px] rounded-md w-[120px]"
                >
                  <p className="mt-1 text-base font-medium select-none">
                    {months[today.month()]}
                  </p>
                  <RiArrowDropDownLine className="scale-150 mt-2" />
                </button>
                {isOpenMonth && (
                  <div
                    onClick={() => setIsOpenMonth(false)}
                    className="absolute"
                  >
                    <div className=" flex justify-end mt-[-2.2rem] ml-[rem]">
                      <div className=" bg-white p-1 h-[350px] mr-10 pr-3 shadow-tableShadow rounded-md">
                        {months?.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              monthHandler(index);
                            }}
                            className="py-1 text-sm px-4 pr-9 rounded-md cursor-pointer transition-all duration-800 ease-in-out text-primary hover:bg-[#000033] hover:text-white"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* month filter ended */}

              {/* year filter started */}
              <div className="relative">
                <button
                  onClick={() => setIsOpenYear(!isOpenYear)}
                  className="cursor-pointer text-[#131A29] flex justify-center gap-2 mt-1  h-[32px] rounded-md w-[120px]"
                >
                  <p className="mt-1 text-base font-medium select-none">
                    {today.year()}
                  </p>
                  <RiArrowDropDownLine className="scale-150 mt-2" />
                </button>
                {isOpenYear && (
                  <div
                    onClick={() => setIsOpenYear(false)}
                    className="absolute"
                  >
                    <div className=" flex justify-end mt-[-2.2rem] ml-[rem]">
                      <div className=" bg-white h-[340px] overflow-auto p-1 mr-10 pr-3 shadow-tableShadow rounded-md">
                        {years?.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              yearHandler(item.yearsIndex);
                            }}
                            className="py-1 text-sm px-4 pr-12 rounded-md cursor-pointer transition-all duration-800 ease-in-out text-primary hover:bg-[#000033] hover:text-white"
                          >
                            {item.yearsValue}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* year filter ended */}
            </div>

            <button
              className="md:px-6"
              onClick={() => {
                setIsOpenMonth(false);
                setIsOpenYear(false);
              }}
            >
              <GrFormNext
                className="w-6 h-8 cursor-pointer hover:scale-110 transition-all mr-2 "
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </button>
          </div>
        </div>
        <div
          onClick={() => {
            setIsOpenMonth(false);
            setIsOpenYear(false);
          }}
          className="grid grid-cols-7 "
        >
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center py-2 md:py-3 grid place-content-center text-[#7F7F7F] select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div
          onClick={() => {
            setIsOpenMonth(false);
            setIsOpenYear(false);
          }}
          className=" grid grid-cols-7 "
        >
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="pb-1 md:pb-2 text-center grid place-content-center text-[13px] md:text-sm"
                >
                  <h1
                    className={cn(
                      // background color for today
                      today ? "bg-secoundry text-white" : "",
                      // backgroun color for selected date
                      selectDate.toDate().toDateString() ===
                        date.toDate().toDateString()
                        ? "bg-secoundry text-white"
                        : "",
                      // background color for current month except selected date and today
                      currentMonth &&
                        !today &&
                        selectDate.toDate().toDateString() !==
                          date.toDate().toDateString()
                        ? "bg-[#E2ECFF] text-[#131A29]"
                        : "",
                      currentMonth ? "" : "text-[#7F7F7F]",
                      "h-7 md:h-8 w-9 md:w-12 rounded-lg grid place-content-center hover:bg-[#FFECEB] hover:border-secoundry hover:text-secoundry hover:border-[2px] transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => setShowDatePickerC(false)}
            className="bg-[#DDDDDD] text-[#888888] rounded-lg flex justify-center w-[45%] h-10 py-2 ml-2 select-none"
          >
            Cancel
          </button>
          <button
            onClick={() =>{chooseDateHandler()} }
            className={`bg-[#000033] hover:bg-[#FF0066] text-white rounded-lg h-10
                    flex justify-center w-[45%] py-2 mr-2 select-none`}
          >
            Choose Date
          </button>
        </div>
      </div>

      {/* <div className="h-96 w-96 sm:px-5">
            this is the selected date
        <h1 className=" font-semibold">{dayjs(selectDate.toDate().toDateString()).format('DD/MM/YYYY')}</h1>
        <h1 className=" font-semibold">{dayjs(today).format('DD/MM/YYYY')}</h1>
      </div> */}
    </div>
  );
}
