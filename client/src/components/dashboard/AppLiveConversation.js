"use client";

import { useState } from "react";
import { Mic } from "lucide-react";

export default function AppLiveConversation() {
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTime(0);
      const interval = setInterval(() => {
        setTime((prev) => {
          if (!isRecording) clearInterval(interval);
          return prev + 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Live Conversation Capture</h1>
      <p className="text-sm text-gray-500 mb-4">Doctor & Patient Dialogue</p>

      <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2 rounded mb-6">
        Get Started
      </button>

      <div className="mb-6">
        <div className="relative mb-4">
          <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <Mic className="text-white w-8 h-8" />
          </div>
          {isRecording && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </div>



        <div className="w-52 h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-cyan-500 transition-all"
            style={{ width: `${Math.min((time / 60) * 100, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">0:{time.toString().padStart(2, "0")}</p>
        <button
          onClick={toggleRecording}
          className="text-sm text-gray-700 underline hover:text-gray-900"
        >
          Click to {isRecording ? "stop" : "start"} recording
        </button>
      </div>

      {/* Doctor & Patient Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        {/* Doctor */}
        <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
          <p className="text-gray-400 text-sm mb-1">Doctor Profile</p>
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2" />
          <h3 className="font-semibold text-gray-800">Dr. John Smith</h3>
          <p className="text-sm text-gray-500">Cardiology</p>
          <span className="inline-block mt-2 bg-cyan-100 text-cyan-700 text-xs px-3 py-1 rounded-full">
            Cardiology
          </span>
        </div>

        {/* Patient */}
        <div className="bg-white border rounded-lg p-4 shadow-sm text-center">
          <p className="text-gray-400 text-sm mb-1">Patient Profile</p>
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2" />
          <h3 className="font-semibold text-gray-800">Jane Doe</h3>
          <p className="text-sm text-gray-500">45 years</p>
        </div>
      </div>
    </div>
  );
}
