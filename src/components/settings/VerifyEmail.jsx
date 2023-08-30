// import React from 'react'

// const VerifyEmail = () => {
//   return (
//     <div>VerifyEmail</div>
//   )
// }

// export default VerifyEmail

import React, { useState } from "react";

const Emailkly = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button
        id="clickMe"
        onClick={handleClick}
        style={{
          backgroundColor: isPopupOpen ? "#00000" : "",
          opacity: isPopupOpen ? 0.8 : 1,
        }}
      >
        Click Me
      </button>
      {isPopupOpen && (
        <div className="bg-white text-primary">
          <h1>This is a popup</h1>
          <p>This is some text in the popup</p>
          <button onClick={handleClick}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Emailkly;
