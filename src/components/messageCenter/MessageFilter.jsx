// this file is just for logic perpose and can be deleted, in the term of use there is no use
import React, { useState } from "react";
// moment is usefull library to play with time used in second component
import moment from "moment";


const messages = [
  {
    title: "Message 1",
    phoneNumber: "1234567890",
    time: new Date("2022-06-01T00:00:00Z"),
  },
  {
    title: "Message 2",
    phoneNumber: "0987654321",
    time: new Date("2022-05-31T00:00:00Z"),
  },
  {
    title: "Message 3",
    phoneNumber: "1234567890",
    time: new Date("2022-05-30T00:00:00Z"),
  },
  {
    title: "Message 4",
    phoneNumber: "0987654321",
    time: new Date("2022-05-29T00:00:00Z"),
  },
];

const MessageList = () => {
  const [filterType, setFilterType] = useState("last7Days");

  const filteredMessages = messages.filter((message) => {
    const messageTime = new Date(message.time);
    const now = new Date();
    switch (filterType) {
      case "last7Days":
        return messageTime > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case "lastMonth":
        return messageTime > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case "last6Months":
        return messageTime > new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
      default:
        return true;
    }
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilterType("last7Days")}>Last 7 Days</button>
        <button onClick={() => setFilterType("lastMonth")}>Last Month</button>
        <button onClick={() => setFilterType("last6Months")}>Last 6 Months</button>
      </div>
      <ul>
        {filteredMessages.map((message) => (
          <li key={message.title}>
            {message.title} - {message.phoneNumber} - {new Intl.DateTimeFormat("en-US").format(new Date(message.time))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;



/// new way to do the above think with moment libery

// const messages = [
//   {
//     title: "Message 1",
//     phoneNumber: "1234567890",
//     time: moment().subtract(1, "days").toDate(),
//   },
//   {
//     title: "Message 2",
//     phoneNumber: "0987654321",
//     time: moment().subtract(2, "days").toDate(),
//   },
//   {
//     title: "Message 3",
//     phoneNumber: "1234567890",
//     time: moment().subtract(3, "days").toDate(),
//   },
//   {
//     title: "Message 4",
//     phoneNumber: "0987654321",
//     time: moment().subtract(4, "days").toDate(),
//   },
// ];

export const MessageListt = () => {
  const [filterType, setFilterType] = useState("last7Days");

  const filteredMessages = messages.filter((message) => {
    const messageTime = moment(message.time);
    const now = moment();
    switch (filterType) {
      case "last7Days":
        return messageTime.isAfter(now.subtract(7, "days"));
      case "lastMonth":
        return messageTime.isAfter(now.subtract(1, "months"));
      case "last6Months":
        return messageTime.isAfter(now.subtract(6, "months"));
      default:
        return true;
    }
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilterType("last7Days")}>Last 7 Days</button>
        <button onClick={() => setFilterType("lastMonth")}>Last Month</button>
        <button onClick={() => setFilterType("last6Months")}>Last 6 Months</button>
      </div>
      <ul>
        {filteredMessages.map((message) => (
          <li key={message.title}>
            {message.title} - {message.phoneNumber} - {moment(message.time).format("YYYY-MM-DD")}
          </li>
        ))}
      </ul>
    </div>
  );
};

  