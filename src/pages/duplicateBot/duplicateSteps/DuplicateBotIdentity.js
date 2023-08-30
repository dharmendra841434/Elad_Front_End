import React, { useState, useEffect } from "react";
import InpuField from "../../../components/InpuField";
import DropDown from "../../../components/DropDown";
import VoiceDropDown from "../../../components/VoiceDropDown";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { botIdentitySchema } from "../../../utils/schemas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Howl } from "howler";
import MusicPlay from "../../../assets/images/Icons/MusicPlay";
import CustomSlider from "../../../components/CustomSlider";

const DuplicateBotIdentity = ({ onNext }) => {
  const [initialData, setInitialData] = useState({});
  const [availableLanguage, setAvailableLanguage] = useState([]);
  const [availableVoiceType, setAvailableVoiceType] = useState([]);
  const [previewLoader, setPreviewLoader] = useState(false);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: botIdentitySchema,
    initialValues: {
      botName: initialData != null ? initialData.botName : "",
      language: initialData != null ? initialData.botLanguage : "",
      voiceType: initialData != null ? initialData.botVoice : "",
      speed: initialData != null ? initialData.voiceSpeed : 1.0,
      pitch: initialData != null ? initialData.voicePitch : 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      goNext(values);
    },
  });

  const navigate = useNavigate();

  const goNext = (values) => {
    onNext();
    const formdata = {
      botName: values.botName,
      botLanguage: values.language,
      botVoice: values.voiceType,
      voiceSpeed: values.speed,
      voicePitch: values.pitch,
    };

    localStorage.setItem("dupBotIdentity", JSON.stringify(formdata));
  };

  const token = localStorage.getItem("token");

  const getBotLanguage = async () => {
    const config = {
      headers: {
        Authorization: "Bearer" + token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/list_languages`, config)
      .then((r) => {
        // console.log(r.data, "language data");
        setAvailableLanguage(r.data.language);
      })
      .catch((err) => {
        console.log(err, "this is Error");
      });
  };

  const getBotVoiceType = async () => {
    const config = {
      headers: {
        Authorization: "Bearer" + token,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/list_voice?language=${values.language}`,
        config
      )
      .then((r) => {
        // console.log(r.data, "voice data");
        let f = r?.data?.filter((itm) => itm?.name?.includes("Neural"));
        setAvailableVoiceType(f);
      })
      .catch((err) => {
        console.log(err, "this is Error");
      });
  };

  useEffect(() => {
    getBotLanguage();
  }, []);
  useEffect(() => {
    getBotVoiceType();
  }, [values.language]);

  useEffect(() => {
    //console.log(r, 'hdjs');

    setInitialData(JSON.parse(localStorage.getItem("dupBotIdentity")));
  }, []);

  //console.log(values.language, "selected language");
  const preViewBot = async () => {
    let payload = {
      language: values.language,
      voice_name: values.voiceType,
      pitch: values.pitch.toString(),
      speed: values.speed.toString(),
      text: `Hello,i am ${values.botName}. How can i help you?`,
    };

    await axios
      .post(`https://dev.paka-ai.com/bot_preview`, payload)
      .then((res) => {
        console.log(res.data, "preview");
        setPreviewLoader(true);
        let aduio = new Howl({
          src: [`https://dev.paka-ai.com/${res.data.audio_response}`], ///'http://soundbible.com/mp3/45min_april_rainstorm-mike-koenig.mp3',
          html5: true,
          onend: async () => {
            // console.log("audio completed");
            setPreviewLoader(false);
          },
        });
        aduio.play();
      })
      .catch((error) => {
        console.log(error, "error");
        toast.error(error.response.data.message, {
          theme: "colored",
          autoClose: 1000,
          progress: false,
          hideProgressBar: true,
          style: { backgroundColor: "red" },
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className=" w-5/6  md:w-3/5 xl:w-1/3 pt-6">
      <ToastContainer />
      <InpuField
        onChange={handleChange("botName")}
        onBlur={handleBlur("botName")}
        title="Bot Name"
        value={values?.botName === undefined ? "" : values.botName}
        placeholder="eg. Technical Team Handler"
      />
      <div className=" h-12 pt-1  ">
        {touched.botName && errors.botName && (
          <p className="  text-[11px] text-red-500">{errors.botName}</p>
        )}
      </div>

      <DropDown
        title="Language"
        selectedText={values.language}
        placeholder="Select-Language"
        setSelectedText={(r) => {
          // setLanguage(r);
          // setLanguageError(false);
          setFieldValue("language", r);
          getBotVoiceType();
        }}
        options={["en-US"]}
        dropDownClassName=" overflow-y-scroll h-56 z-50"
      />
      <div className=" h-12 pt-1">
        {touched.language && errors.language && (
          <p className="   text-[11px] z-50 text-red-500">{errors.language}</p>
        )}
      </div>
      <VoiceDropDown
        title="Voice Type"
        placeholder="Select Voice"
        selectedText={values.voiceType}
        setSelectedText={(r) => {
          setFieldValue("voiceType", r);
          setFieldTouched("voiceType", false);
          // setVoice(r);
          // setVoiceError(false);
        }}
        options={availableVoiceType}
      />
      <div className=" h-12 pt-1">
        {touched.voiceType && errors.voiceType && (
          <p className="  text-[11px] text-red-500">Select Voice</p>
        )}
      </div>
      {/* <RangeSelector
        onChange={handleChange("speed")}
        range={values?.speed === undefined ? 0 : values.speed}
        onBlur={handleBlur("speed")}
        title="Speed"
        min={0}
        max={4}
      /> */}
      <CustomSlider
        onChange={handleChange("speed")}
        range={values?.speed === undefined ? 0 : values.speed}
        onBlur={handleBlur("speed")}
        title="Speed"
        min={0.25}
        max={4}
        steps={0.01}
      />
      <div className=" h-12 pt-1">
        {touched.speed && errors.speed && (
          <p className="  text-[11px] text-red-500">{errors.speed}</p>
        )}
      </div>
      {/* <RangeSelector
        title="Pitch"
        onChange={handleChange("pitch")}
        range={values.pitch === undefined ? 0 : values.pitch}
        onBlur={handleBlur("pitch")}
        min={-20}
        max={20}
      /> */}
      <CustomSlider
        title="Pitch"
        onChange={handleChange("pitch")}
        range={values.pitch === undefined ? 0 : values.pitch}
        onBlur={handleBlur("pitch")}
        min={-20}
        max={20}
      />
      <div className=" h-12 pt-1">
        {touched.pitch && errors.pitch && (
          <p className="  text-[11px] text-red-500">{errors.pitch}</p>
        )}
      </div>
      <div className=" flex my-9">
        <span
          onClick={() => {
            preViewBot();
            // checkAUdio();
          }}
          className=" flex items-center bg-primary cursor-pointer  px-4 rounded-md mx-3"
        >
          {previewLoader ? (
            <MusicPlay />
          ) : (
            <div className=" flex items-center h-[1rem]">
              <img
                alt="preview"
                className=" h-5 w-5"
                src={require("../../../assets/images/preview.png")}
              />
              <p className=" text-white mx-2">Preview</p>
            </div>
          )}
        </span>
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

export default DuplicateBotIdentity;
