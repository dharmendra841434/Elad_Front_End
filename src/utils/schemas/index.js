import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstname: yup
    .string("only string is allowed")
    .required("FirsName is required"),
  lastname: yup
    .string("only string is allowed")
    .required("LastName is required"),
  email: yup.string().email("Enter Valid Email").required("Email is required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  rePassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const botIdentitySchema = yup.object().shape({
  botName: yup.string("only string is allowed").required("BotName is required"),
  language: yup
    .string("only string is allowed")
    .required("Language is required"),
  voiceType: yup
    .string("only string is allowed")
    .required("vice type is required"),
  speed: yup.number("Only Number Allowed").required("pitch is required"),
  pitch: yup.number("Only Number Allowed").required("pitch is required"),
});

export const botGreetingSchema = yup.object().shape({
  botGreetings: yup.array(
    yup.object().shape({
      greetText: yup.string("only string is allowed").required("Required"),
    })
  ),
});

export const yourBussinessSchema = yup.object().shape({
  businessName: yup
    .string("only string is allowed")
    .required("Business Name is required"),
  businessDesc: yup
    .string("only string is allowed")
    .required("Business Description is required"),
  // countryISO: yup
  //   .string("only string is allowed")
  //   .required("Country ISO is required"),
  totalBranches: yup.array(
    yup.object().shape({
      branchName: yup.string("only string is allowed").required("Required"),
      description: yup.string("only string is allowed").required("Required"),
      contact: yup.string("only string is allowed").required("Required"),
    })
  ),
});

export const faqSchema = yup.object().shape({
  toggle: yup.boolean("Only true or false").required("required"),
  totalworkingHours: yup.array(
    yup.object().shape({
      day: yup.string("only string is allowed").required("Required"),
      active: yup.boolean("Only true or false").required("Required"),
      workingTime: yup.array(
        yup.object().shape({
          from: yup.string("only string is allowed").required("Required"),
          to: yup.string("only string is allowed").required("Required"),
        })
      ),
    })
  ),
  businessFAQ: yup.array(
    yup.object().shape({
      question: yup.string("only string is allowed").required("Required"),
      answer: yup.string("only string is allowed").required("Required"),
    })
  ),
  timeZone: yup.object().required("Required"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, ({ min }) => ``)
    .required("Old password is required"),
  newPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("New password is required"),
  confermPassword: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Conferm password is required"),
});

export const profileSchema = yup.object().shape({
  firstName: yup
    .string("only string is allowed")
    .required("FirstName is required"),
  lastName: yup
    .string("only string is allowed")
    .required("Last Name is required"),
});
