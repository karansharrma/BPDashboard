import React from "react";

const VehicleMeter = () => {
  const currentReading = 5; // Example reading
  const maxReading = 100; // Example maximum value
  const angle = (currentReading / maxReading) * 180; // Calculate the angle for the needle

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-36 h-20 overflow-hidden mb-2">
        <div className="absolute bottom-0 left-0 right-0 h-15 rounded-t-full border-2 border-black flex justify-around items-end">
          {Array.from({ length: 11 }).map((_, index) => (
            <div
              key={index}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-black"
              style={{ transform: `translateX(-50%) rotate(${index * 18}deg)` }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 origin-bottom h-10 w-1 bg-red rounded-t-sm"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-black rounded-full" />
      </div>
      <div className="border border-black rounded-md px-2 py-1 font-mono text-lg">
        {String(currentReading).padStart(5, "0")}
      </div>
    </div>
  );
};

export default VehicleMeter;
