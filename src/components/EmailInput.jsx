import React, { useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

// boxClassName props is used for add css

const EmailInput = ({ boxClassName, emails, setEmails }) => {
  const [isShown, setIsShown] = useState(false);
  const inputBorderHandler = (event) => {
    setIsShown((current) => !current);
  };

  const handleKeyDown = (e) => {
    const { value } = e.target;
    if (e.key === "Enter") {
      const newEmails = value.split(",").map((email) => email.trim());
      const validEmails = newEmails.filter((email) => isValidEmail(email));
      setEmails([...emails, ...validEmails]);
      e.target.value = "";
    }
    // if (value.includes(",")) {
    //   const newEmails = value.split(",").map((email) => email.trim());
    //   const validEmails = newEmails.filter((email) => isValidEmail(email));
    //   setEmails([...emails, ...validEmails]);
    //   e.target.value = "";
    // }
  };

  const removeEmail = (index) => {
    setEmails([...emails.slice(0, index), ...emails.slice(index + 1)]);
  };

  const isValidEmail = (email) => {
    // Email validation logic using a regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div
      onClick={inputBorderHandler}
      className={`${boxClassName} bg-[#EEEEEE] rounded-md overflow-x-hidden  cursor-text`}
    >
      {emails?.slice(0, 1)?.map((email, index) => (
        <div
          key={email}
          className="bg-primary text-[11px] opacity-80 text-white inline-block m-2 px-4 py-1.5 rounded-md"
        >
          {email}
          <span className="mx-2 pt-1 opacity-70">(default)</span>
        </div>
      ))}
      {emails?.slice(1)?.map((email, index) => (
        <div
          key={email}
          className=" bg-primary text-[11px]  text-white inline-block m-2 px-4 py-1 rounded-md"
        >
          {email}
          <button
            onClick={() => removeEmail(index + 1)}
            className="mx-2 pt-1 hover:text-secoundry"
          >
            <RiCloseCircleFill />
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder={isShown ? "Enter email" : ""}
        onKeyDown={handleKeyDown}
        className={
          isShown
            ? "bg-[#EEEEEE] m-2 cursor-text p-1 outline-none text-[11px]"
            : "bg-[#EEEEEE] m-2  p-1 outline-none text-[11px]"
        }
      />
    </div>
  );
};

export default EmailInput;
