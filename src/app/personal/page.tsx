// app/personal/page.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PersonalGate() {
  const [input, setInput] = useState("");
  const [locked, setLocked] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const keypadRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => {
    if (input.length >= 8 || locked) return;
    if (navigator.vibrate) navigator.vibrate(50);
    const newInput = input + value;
    setInput(newInput);
    if (newInput === "2501") {
      router.push("/personal/family");
    } else if (newInput.length >= 8) {
      setLocked(true);
      setShake(true);
    }
  };

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xs">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Enter Passcode
        </h1>
        <div className="text-center text-4xl tracking-widest font-mono p-4 bg-white rounded-lg shadow-inner border border-gray-300 mb-4">
          {input.padEnd(4, "•")}
        </div>
        {locked && (
          <p className="text-red-500 text-center mb-4 text-sm">
            Sorry, you do not have access to this page. Please contact Isaac if
            you need the password.
          </p>
        )}
        <div
          ref={keypadRef}
          className={`grid grid-cols-3 gap-4 transition-transform duration-300 ${
            shake ? "animate-shake" : ""
          }`}
        >
          {[..."123456789*0#"].map((n) => (
            <button
              key={n}
              onClick={() => handleClick(n)}
              className="bg-gray-200 text-gray-800 text-2xl font-semibold py-4 rounded-lg hover:bg-gray-300"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-6px);
          }
          50% {
            transform: translateX(6px);
          }
          75% {
            transform: translateX(-4px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
