import React, { useState, useEffect, useRef } from "react";

const Odometer = ({ value = 0, duration = 1000, title = "dummytitle" }) => {
  const digits = 8;
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    if (displayValue === value) return;

    setIsAnimating(true);
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue =
        startValueRef.current + (value - startValueRef.current) * easeOutCubic;

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  const formattedValue = Math.floor(displayValue).toString();
  const paddedValue = formattedValue.padStart(digits, "0");

  return (
    <div className="inline-flex flex-col items-center justify-center bg-gray-950 border-4 border-blue-800 p-4 rounded-xl">
      {/* Text at the top */}
      <div className="mb-2 text-white text-sm font-medium">{title}</div>

      {/* Digits + "km" inline */}
      <div className="relative overflow-hidden bg-black rounded-lg shadow-lg border-2 border-gray-800 flex items-center px-4 py-2">
        <div className="flex">
          {paddedValue.split("").map((digit, index) => (
            <DigitColumn
              key={index}
              digit={digit}
              isAnimating={isAnimating}
              animationDelay={index * 50}
            />
          ))}
        </div>
        <span className="ml-2 text-white text-lg font-semibold">km</span>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -skew-x-12 animate-pulse pointer-events-none"></div>
      </div>
    </div>
  );
};

const DigitColumn = ({ digit, isAnimating, animationDelay = 0 }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit && isAnimating) {
      setTimeout(() => {
        setIsSpinning(true);
        setTimeout(() => {
          setCurrentDigit(digit);
          setIsSpinning(false);
        }, 200);
      }, animationDelay);
    } else if (!isAnimating) {
      setCurrentDigit(digit);
    }
  }, [digit, currentDigit, isAnimating, animationDelay]);

  const isNumeric = /^\d$/.test(currentDigit);

  return (
    <div className="relative w-8 h-12 bg-gray-900 border-r border-gray-700 last:border-r-0">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>

      <div
        className={`
        absolute inset-0 flex items-center justify-center
        font-mono text-2xl font-bold text-green-400
        transition-transform duration-200 ease-in-out
        ${
          isSpinning
            ? "transform translate-y-2 opacity-0"
            : "transform translate-y-0 opacity-100"
        }
      `}
      >
        {isNumeric && isSpinning && (
          <div className="absolute inset-0 flex flex-col justify-center items-center animate-spin-fast">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-green-300 opacity-30 text-sm">
                {i}
              </span>
            ))}
          </div>
        )}
        <span className="relative z-10 drop-shadow-lg">{currentDigit}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-5"></div>
    </div>
  );
};

export default Odometer;
