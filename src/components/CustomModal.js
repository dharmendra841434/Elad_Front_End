import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CustomModal = ({ isOpen, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted &&
    createPortal(
      <>
        {isOpen && (
          <div className=" fixed top-0 left-0 bottom-0 right-0 bg-primary/70   shadow-xl  z-50 ">
            <div className=" flex  justify-center h-full ">{children}</div>
          </div>
        )}
      </>,
      document.getElementById("root")
    )
  );
};

export default CustomModal;
