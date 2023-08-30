import React from "react";

const invoiceData = [
  {
    invoiceId: "#40079301",
    issueDate: "Mar 16, 2023",
    paidOn: "Mar 16, 2023",
    amountPaid: "$8.00",
    total: "$8.00",
    downloadPDF: "abc",
    status: "paid",
  },
  {
    invoiceId: "#40079302",
    issueDate: "Mar 16, 2023",
    paidOn: "Mar 16, 2023",
    amountPaid: "$8.00",
    total: "$8.00",
    downloadPDF: "abc",
    status: "paid",
  },
];
const Invoices = () => {
  return (
    <div className="mt-5 rounded-[10px] bg-white box-border border-[1px] border-solid border-[#c8c8c8] overflow-hidden">
      <div className="w-full h-10 border-b text-primary text-[16px] font-medium p-2 pl-4">
        Balance: $0.00
      </div>
      <div className=" overflow-x-auto scrollbar-hide scroll-smooth">
        <div className="m-3 w-[760px] md:w-[98%]">
          <div className="bg-blue-100 text-[#7F7F7F] text-[16px] font-medium flex gap-3 justify-between mt-1 md:mx-1 rounded-t-xl px-3 md:px-5 py-4 lg:text-[13px]">
            <p className="basis-[14.28%] flex justify-center ">Invoice Id </p>
            <p className="basis-[14.28%] flex justify-center ">Issue date </p>
            <p className="basis-[14.28%] flex justify-center ">Paid on </p>
            <p className="basis-[14.28%] flex justify-center ">Amount paid</p>
            <p className="basis-[14.28%] flex justify-center ">Total</p>
            <p className="basis-[14.28%] flex justify-center ">
              Download Invoice
            </p>
            <p className="basis-[14.28%] flex justify-center ">Status</p>
          </div>
          {invoiceData.map((invoice) => (
            <div
              key={invoice.invoiceId}
              className="bg-blue-100 text-primary flex gap-3 justify-between mt-1 md:mx-1 rounded-b-xl px-3 md:px-5 py-4 text-[16px] font-medium lg:text-[13px]"
            >
              <p className="basis-[14.28%] flex justify-center text-[#FF0000]">
                {invoice.invoiceId}
              </p>
              <p className="basis-[14.28%] flex justify-center ">
                {invoice.issueDate}
              </p>
              <p className="basis-[14.28%] flex justify-center ">
                {invoice.paidOn}
              </p>
              <p className="basis-[14.28%] flex justify-center ">
                {invoice.amountPaid}
              </p>
              <p className="basis-[14.28%] flex justify-center ">
                {invoice.total}
              </p>
              <p className="basis-[14.28%] flex justify-center hover:text-[#FF0066] cursor-pointer underline">
                Download PDF
              </p>
              <p className="basis-[14.28%] flex justify-center text-[#10C300] ">
                {invoice.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
