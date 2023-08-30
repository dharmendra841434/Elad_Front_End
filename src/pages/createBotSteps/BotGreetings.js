import React, { useState, useEffect } from "react";
import InpuField from "../../components/InpuField";
import { MdAdd } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { botGreetingSchema } from "../../utils/schemas";

const BotGreetings = ({ onNext, goPrevious }) => {
  // const [numberOfGreeting, setNumberOfGreeting] = useState([{ greetText: "" }]);
  const [greetingError, setGreetingError] = useState(false);
  const [initialData, setInitialData] = useState({});

  const { setFieldValue, values } = useFormik({
    validationSchema: botGreetingSchema,
    initialValues: {
      botGreetings:
        initialData != null ? initialData.botGreetings : [{ greetText: "" }],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      goNext(values);
    },
  });

  const getGreeting = (value, index) => {
    const newArray = values.botGreetings?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          greetText: value,
        };
      } else {
        return item;
      }
    });
    setFieldValue("botGreetings", newArray);
  };

  const goNext = () => {
    console.log("ksjdkshdh");
    for (let i = 0; i < values.botGreetings.length; i++) {
      if (values.botGreetings[i].greetText === "") {
        setGreetingError(true);
        return;
      }
    }

    const form = {
      botGreetings: values.botGreetings,
    };
    onNext();
    localStorage.setItem("greeting", JSON.stringify(form));
  };

  useEffect(() => {
    setInitialData(JSON.parse(localStorage.getItem("greeting")));
  }, []);

  //console.log(initialData, "greeting");
  return (
    <div className=" w-full  md:w-5/6 xl:w-4/5 pt-6  ">
      {values.botGreetings?.map((item, index) => (
        <div key={index} className="  relative mt-5">
          <InpuField
            title={`Greetings ${index + 1}`}
            multiline={true}
            value={item.greetText}
            onChange={(g) => {
              getGreeting(g.target.value, index);
              setGreetingError(false);
            }}
            placeholder="eg: Hello! I am your friendly Technical Team Bot. How may I assist you today?"
          />
          {index > 0 && (
            <FaTrashAlt
              onClick={() => {
                let t = values.botGreetings.slice(0, -1);
                setFieldValue("botGreetings", t);
              }}
              className=" absolute -right-6 cursor-pointer hover:text-red-600 top-5 text-appgray"
            />
          )}
        </div>
      ))}
      <div className=" h-12 pt-1  ">
        {greetingError && (
          <p className="  text-[11px] text-red-500">
            Enter Greeting {values.botGreetings.length}
          </p>
        )}
      </div>
      <div
        onClick={() => {
          let a = [...values.botGreetings];

          setFieldValue("botGreetings", a.concat({ greetText: "" }));
        }}
        className="bg-primary cursor-pointer h-5 w-5 flex items-center justify-center rounded-full "
      >
        <MdAdd className="  text-white text-xl " />
      </div>
      <div className=" flex my-9  mt-20">
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

export default BotGreetings;
