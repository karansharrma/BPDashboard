import React from "react";

const Odometer = ({ value = 0, title = "dummytitle" }) => {
  const digits = 8;

  const formattedValue = Math.floor(value).toString();
  const paddedValue = formattedValue.padStart(digits, "0");

  return (
    <div className="inline-flex flex-col items-center justify-center bg-gray-950 border-4 border-blue-800 p-4 rounded-xl">
      <div className="mb-2 text-white text-sm font-medium">{title}</div>

      {/* Digits + "km" inline */}
      <div className="relative overflow-hidden bg-black rounded-lg shadow-lg border-2 border-gray-800 flex items-center px-4 py-2">
        <div className="flex">
          {paddedValue.split("").map((digit, index) => (
            <DigitColumn key={index} digit={digit} />
          ))}
        </div>
        <span className="ml-2 text-white text-lg font-semibold">km</span>
      </div>
    </div>
  );
};

const DigitColumn = ({ digit }) => {
  return (
    <div className="relative w-8 h-12 bg-gray-900 border-r border-gray-700 last:border-r-0">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

      <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold text-green-400">
        <span className="relative z-10 drop-shadow-lg">{digit}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-5"></div>
    </div>
  );
};

export default Odometer;
