import React, { useState, useEffect } from "react";
import InpuField from "../../components/InpuField";
import DescriptionInput from "../../components/DescriptionInput";
import { FaTrashAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import ContactInput from "../../components/ContactInput";
import { useFormik } from "formik";
import { yourBussinessSchema } from "../../utils/schemas";

const YourBusiness = ({ onNext, goPrevious }) => {
  const [selectedCode, setSelectedCode] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({
    ISO: "US",
    Country: "United States",
    Country_Code: 1,
    ISO_CODES: "US / USA",
  });

  const [initialData, setInitialData] = useState();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setTouched,
    setFieldError,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: yourBussinessSchema,
    initialValues: {
      businessName: initialData != null ? initialData.businessName : "",
      businessDesc: initialData != null ? initialData.businessDesc : "",
      countryISO: initialData != null ? initialData.countryISO : "US",
      totalBranches:
        initialData != null
          ? initialData.totalBranches
          : [
              {
                branchName: "",
                description: "",
                contact: "",
                countryCode: 1,
              },
            ],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      goNext(values);
    },
  });

  console.log(errors, "hdj");

  const getBranchName = (value, index) => {
    const newArray = values.totalBranches?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          ...item,
          branchName: value,
        };
      } else {
        return item;
      }
    });
    setFieldValue("totalBranches", newArray);
  };

  const getBussinessDesc = (value, index) => {
    const newArray = values.totalBranches?.map((item, i) => {
      if (i === index) {
        // console.log(day, "index");
        return {
          ...item,
          description: value,
        };
      } else {
        return item;
      }
    });
    setFieldValue("totalBranches", newArray);
  };

  const setCountryCode = (value) => {
    const newArray = values.totalBranches?.map((item, i) => {
      return {
        ...item,
        countryCode: value,
      };
    });
    setFieldValue("totalBranches", newArray);
  };

  const getContact = (value, index) => {
    const newArray = values.totalBranches?.map((item, i) => {
      if (i === index) {
        console.log(value, "dfsddfgdf dfgdf");
        return {
          ...item,
          contact: `${value}`,
        };
      } else {
        return item;
      }
    });
    setFieldValue("totalBranches", newArray);
  };

  const goNext = () => {
    console.log("sdjs");
    onNext();
    const formdata = {
      businessName: values.businessName,
      businessDesc: values.businessDesc,
      totalBranches: values.totalBranches,
      countryISO: values.countryISO,
    };

    localStorage.setItem("yourBusiness", JSON.stringify(formdata));
  };

  useEffect(() => {
    setInitialData(JSON.parse(localStorage.getItem("yourBusiness")));
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-11/12  md:w-3/5 xl:w-1/2 pt-6  "
    >
      <InpuField
        onChange={handleChange("businessName")}
        onBlur={handleBlur("businessName")}
        value={values.businessName}
        title="Business Name"
        placeholder="eg-The Organic Store"
      />
      <div className=" h-12 pt-1  ">
        {touched.businessName && errors.businessName && (
          <p className="  text-[11px] text-red-500">{errors.businessName}</p>
        )}
      </div>
      <div className=" my-0">
        <DescriptionInput
          title="Business Description"
          onChange={handleChange("businessDesc")}
          onBlur={handleBlur("businessDesc")}
          value={values.businessDesc}
          placeholder="eg - Our online organic store is dedicated to providing our customers ..."
        />
        <div className=" h-12 pt-1  ">
          {touched.businessDesc && errors.businessDesc && (
            <p className="  text-[11px] text-red-500">{errors.businessDesc}</p>
          )}
        </div>
      </div>
      <div>
        <h2 className=" text-primary">Business Branches</h2>
        {values.totalBranches?.map((item, index) => (
          <div key={index} className=" mt-10 relative">
            <InpuField
              onChange={(n) => {
                getBranchName(n.target.value, index);
                if (n.target.value.length > 0) {
                  setTouched("totalBranches", false);
                  setFieldError("totalBranches", false);
                  //setAllError(false);
                }
              }}
              value={item.branchName}
              title="Branch Name"
              placeholder="enter branch name"
            />

            <div className=" my-8">
              <DescriptionInput
                onChange={(n) => {
                  getBussinessDesc(n.target.value, index);
                  if (n.target.value.length > 0) {
                    setTouched("totalBranches", false);
                    setFieldError("totalBranches", false);
                    //setAllError(false);
                  }
                }}
                value={item.description}
                title="Branch Description"
                placeholder="eg - Our online organic store is dedicated to providing our customers ..."
              />
            </div>
            <ContactInput
              selectedCountryCode={item.countryCode}
              setSelectedCountryCode={(r) => {
                setCountryCode(r.Country_Code);
                setSelectedCode(r.Country_Code);
                setSelectedCountry(r);
                setFieldValue("countryISO", r.ISO);
              }}
              country={selectedCountry}
              title="Contact Number"
              onChange={(r) => {
                getContact(r.target.value, index);
                if (r.target.value.length > 0) {
                  setTouched("totalBranches", false);
                  setFieldError("totalBranches", false);
                  // setAllError(false);
                }
              }}
              value={item.contact}
              placeholder="eg- 7686-8776"
            />

            {index > 0 && (
              <FaTrashAlt
                onClick={() => {
                  let t = values.totalBranches.slice(0, -1);
                  setFieldValue("totalBranches", t);
                }}
                className=" absolute -right-6 cursor-pointer hover:text-red-600 top-5 text-appgray"
              />
            )}
          </div>
        ))}
        {touched.totalBranches && errors.totalBranches && (
          <div className=" h-12 pt-1  ">
            <p className="  text-[11px] text-red-500">Fill missing field</p>
          </div>
        )}
        <div
          onClick={() => {
            let p = [...values.totalBranches];

            setFieldValue(
              "totalBranches",
              p.concat({
                branchName: "",
                description: "",
                contact: "",
                countryCode: selectedCode,
              })
            );
          }}
          className="bg-primary cursor-pointer h-7 w-7 mt-6 flex items-center justify-center rounded-full "
        >
          <MdAdd className="  text-white text-2xl " />
        </div>
      </div>
      <div className=" flex my-9  mt-60">
        <button
          onClick={goPrevious}
          className=" flex items-center bg-white border-2 border-primary py-1.5 px-10 hover:bg-primary hover:text-white transition-all ease-in-out duration-300 rounded-md mx-3"
        >
          Previous
        </button>
        <button
          type="submit"
          className=" transition-all duration-300 ease-in-out hover:bg-secoundry hover:border-secoundry bg-primary py-2 px-8 rounded-md mx-3 text-white"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default YourBusiness;
