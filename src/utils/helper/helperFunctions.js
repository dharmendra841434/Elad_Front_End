export const smallString = (str, num) => {
  if (str && str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const getDiffrentTime = (createdDate) => {
  var previousDate = new Date(createdDate); // Replace with your desired previous date
  // Current date
  var currentDate = new Date(); // This will use the current date and time

  // Calculate the time difference in milliseconds
  var timeDiff = currentDate.getTime() - previousDate.getTime();

  // Convert the time difference to days
  var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};

export function convertSecondsToHMS(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  return hours + " : " + minutes + " : " + remainingSeconds;
}

export const randomNumber = (length) => {
  return length > 0 ? Math.floor(Math.random() * length) + 1 : 0;
};

export const remainingdaya = (previousISODate) => {
  //const previousISODate = "2023-05-24T00:00:00Z"; // Example previous ISO date
  const previousDate = new Date(previousISODate);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = currentDate - previousDate;

  // Convert milliseconds to days
  const dayDifference = Math.floor(timeDifferenceMs / (24 * 60 * 60 * 1000));

  console.log(`Day difference: ${dayDifference}`);
  return dayDifference;
};

export function calculateRemainingDays(futureDateString) {
  // Get the current date
  var currentDate = new Date();

  // Convert the future date string to a Date object
  var futureDate = new Date(futureDateString);

  // Calculate the difference in milliseconds between the future date and current date
  var timeDifference = futureDate.getTime() - currentDate.getTime();

  // Calculate the remaining days by converting milliseconds to days
  var remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Return the remaining days
  return remainingDays;
}
