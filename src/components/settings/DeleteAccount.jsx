import React, { useState } from "react";

const DeleteAccount = (props) => {
  const { classname } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[14px] font-bold w-[14rem] rounded-md p-2 cursor-pointer bg-primary text-white flex justify-center"
      >
        Delete my account
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" left-[15%] top-[5%] absolute"
        >
          <div className={`${classname} flex justify-end w-[610px] h-[258px]`}>
            <div className=" bg-white p-[5px] shadow-tableShadow rounded-md">
            <p className="flex justify-center mt-8 scale-[2]">😢</p>
              <h6 className="text-primary text-[16px] font-medium mt-2 flex justify-center">
                We're sorry to see you go!
              </h6>
              <p className="text-[16px] text-[#7F7F7F] px-5 my-5">
                If you no longer wish to use PAKA you can delete your account by
                clicking on the "Delete Account" button.
              </p>
              <div className="flex flex-col justify-center items-center">
                <div className="bg-primary text-white w-[40%] py-1 rounded-md cursor-pointer ">
                  <span className="pl-[25%]">Delete Account</span>
                </div>
                <div className="cursor-pointer">Cancel</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
