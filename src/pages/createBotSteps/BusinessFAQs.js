import React, { useState, useEffect } from "react";
import DropDown from "../../components/DropDown";
import Toggle from "../../components/Toggle";
import DaySelector from "../../components/DaySelector";
import InpuField from "../../components/InpuField";
import DescriptionInput from "../../components/DescriptionInput";
import { MdAdd } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { faqSchema } from "../../utils/schemas";
import TimezoneSelect from "react-timezone-select";

const BusinessFAQs = ({ onNext, goPrevious }) => {
  const [initialData, setInitialData] = useState();
  // const [selectedTimezone, setSelectedTimezone] = useState(
  //   initialData != null
  //     ? initialData.timeZone
  //     : Intl.DateTimeFormat().resolvedOptions().timeZone
  // );
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { setFieldValue, values } = useFormik({
    validationSchema: faqSchema,
    initialValues: {
      toggle: initialData != null ? initialData.toggle : false,
      totalworkingHours:
        initialData != null
          ? initialData.totalworkingHours
          : [
              {
                day: "Monday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Tuesday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Wednesday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Thursday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Friday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Saturday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
              {
                day: "Sunday",
                active: false,
                workingTime: [
                  {
                    from: "",
                    to: "",
                  },
                ],
              },
            ],
      businessFAQ:
        initialData != null
          ? initialData.businessFAQ
          : [
              {
                question: "",
                answer: "",
              },
            ],
      timeZone:
        initialData != null
          ? initialData.timeZone
          : {
              abbrev: "YEKT",
              altName: "Yekaterinburg Standard Time",
              label: "(GMT+5:00) Ekaterinburg",
              offset: 5,
              value: "Asia/Yekaterinburg",
            },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      goNext(values);
    },
  });

  const handleToggle = (day) => {
    const newArray = values.totalworkingHours?.map((item, i) => {
      if (item.day === day) {
        return { ...item, active: item.active === true ? false : true };
      } else {
        return item;
      }
    });
    setFieldValue("totalworkingHours", newArray);
    // setWorkingDaysData(newArray);
  };

  const handleAll = () => {
    setFieldValue("toggle", values.toggle === true ? false : true);
    const newArray = values.totalworkingHours?.map((item, i) => {
      return {
        ...item,
        active: values.toggle === true ? false : true,
      };
    });
    setFieldValue("totalworkingHours", newArray);
  };

  // console.log(values.totalworkingHours, "sjdhjs");

  const handleAdd = (day) => {
    const newArray = values.totalworkingHours?.map((item, i) => {
      if (item.day === day) {
        // console.log(day, "index");
        return {
          ...item,
          workingTime: item.workingTime.concat({ from: "", to: "" }),
        };
      } else {
        return item;
      }
    });

    // console.log(newArray, "newjjidj");
    // setWorkingDaysData(newArray);
    setFieldValue("totalworkingHours", newArray);
  };

  const handleRemove = (day, itemIndex) => {
    const newArray = values.totalworkingHours?.map((item, i) => {
      if (item.day === day) {
        // console.log(day, "index");
        return {
          ...item,
          workingTime: item.workingTime.slice(0, -1),
        };
      } else {
        return item;
      }
    });

    setFieldValue("totalworkingHours", newArray);
  };

  const handlefromTime = (day, time, itemIndex) => {
    const newArray = values.totalworkingHours?.map((item, i) => {
      if (item.day === day) {
        const w = item?.workingTime?.map((it, index) => {
          if (itemIndex === index) {
            //console.log(it, "ahkah");
            return {
              ...it,
              from: time,
            };
          } else {
            return it;
          }
        });
        return {
          ...item,
          workingTime: w,
        };
      } else {
        return item;
      }
    });
    // setWorkingDaysData(newArray);
    setFieldValue("totalworkingHours", newArray);
  };

  const handleToTime = (day, time, itemIndex) => {
    const newArray = values.totalworkingHours?.map((item, i) => {
      if (item.day === day) {
        const w = item?.workingTime?.map((it, index) => {
          if (itemIndex === index) {
            //console.log(it, "ahkah");
            return {
              ...it,
              to: time,
            };
          } else {
            return it;
          }
        });
        return {
          ...item,
          workingTime: w,
        };
      } else {
        return item;
      }
    });
    //setWorkingDaysData(newArray);
    setFieldValue("totalworkingHours", newArray);
  };

  const getFaqQuestion = (value, index) => {
    const newArray = values.businessFAQ?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          ...item,
          question: value,
        };
      } else {
        return item;
      }
    });
    //setBFaqs(newArray);
    setFieldValue("businessFAQ", newArray);
  };
  const getFaqAnswer = (value, index) => {
    const newArray = values.businessFAQ?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          ...item,
          answer: value,
        };
      } else {
        return item;
      }
    });
    //setBFaqs(newArray);
    setFieldValue("businessFAQ", newArray);
  };

  const goNext = () => {
    onNext();
    const formdata = {
      toggle: values.toggle,
      totalworkingHours: values.totalworkingHours,
      businessFAQ: values.businessFAQ,
      timeZone: values.timeZone,
    };

    localStorage.setItem("faqs", JSON.stringify(formdata));
  };
  useEffect(() => {
    setInitialData(JSON.parse(localStorage.getItem("faqs")));
  }, []);

  //console.log(values.timeZone, "sjdkhsi");

  return (
    <div>
      <div className=" w-full  md:w-11/12 xl:w-1/2 pt-6  ">
        <div className=" flex justify-between items-center">
          <h3 className=" text-primary font-semibold">Working Hours</h3>
          <div className="  w-1/2 lg:w-1/3">
            <TimezoneSelect
              value={values.timeZone}
              onChange={(t) => {
                setFieldValue("timeZone", t);
              }}
            />
          </div>
        </div>
        <div className=" flex items-center xl:w-1/4 mt-5">
          <Toggle onChange={() => handleAll()} active={values.toggle} />
          <p className=" text-sm text-primary mx-4">Open 24/7</p>
        </div>
        {values.totalworkingHours?.map((item, index) => (
          <div key={index}>
            <DaySelector
              title={item.day}
              options={item.workingTime}
              toggleStatus={item.active}
              setfromTime={(r, i) => {
                handlefromTime(item.day, r, i);
              }}
              settoTime={(t, i) => {
                handleToTime(item.day, t, i);
              }}
              handleAdd={() => handleAdd(item.day)}
              onToggleChange={() => handleToggle(item.day)}
              handleRemove={(r) => {
                handleRemove(item.day, r);
              }}
            />
          </div>
        ))}
      </div>
      <div className=" xl:w-9/12">
        <h2 className=" text-primary text-xl ">Add your Business FAQs</h2>
        {values.businessFAQ?.map((item, index) => (
          <div key={index} className=" relative">
            <div className=" mt-10 ml-6">
              <InpuField
                title="Question"
                onChange={(q) => getFaqQuestion(q.target.value, index)}
                value={item.question}
                placeholder="eg: I can’t track my order, where can I find in the application?"
              />
            </div>
            <div className=" mt-5 ml-6">
              <DescriptionInput
                onChange={(q) => getFaqAnswer(q.target.value, index)}
                title="Answer"
                value={item.answer}
                placeholder="eg: To better track your order, you must check it in My Orders under Settings. If still you don’t find it, try logging into our website, their you can follow the same step to track your order"
              />
            </div>
            {index > 0 && (
              <FaTrashAlt
                onClick={() => {
                  let t = values.businessFAQ.slice(0, -1);
                  setFieldValue("businessFAQ", t);
                }}
                className=" absolute -right-6 cursor-pointer hover:text-red-600 top-5 text-appgray"
              />
            )}
          </div>
        ))}
        <div
          onClick={() => {
            let g = [...values.businessFAQ];

            setFieldValue(
              "businessFAQ",
              g.concat({
                question: "",
                answer: "",
              })
            );
          }}
          className="bg-primary ml-6 cursor-pointer h-5 w-5 flex items-center justify-center rounded-full mt-2"
        >
          <MdAdd className="  text-white text-xl " />
        </div>
      </div>
      <div className=" flex my-9  mt-10">
        <button
          onClick={goPrevious}
          className=" flex items-center bg-white border-2 border-primary py-1.5 px-10 hover:bg-primary hover:text-white transition-all ease-in-out duration-300 rounded-md mx-3"
        >
          Previous
        </button>
        <button
          onClick={() => goNext()}
          className=" transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BusinessFAQs;
