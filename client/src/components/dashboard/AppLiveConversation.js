"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, CircleDot } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const barHeights = [20, 32, 16, 40, 24, 40, 16, 32, 20];

export default function AppLiveConversation() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [language, setLanguage] = useState("en-US");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language;

      recognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript((prev) => prev + finalTranscript + " ");
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const handleStartRecording = () => {
    setRecording(true);
    setStartTime(Date.now());
    setEndTime(null);
    setTranscript("");
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
      recognitionRef.current.start();
    } else {
      console.error("Speech recognition not available");
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const handleStopRecording = () => {
    setRecording(false);
    setEndTime(Date.now());
    if (!recognitionRef.current) {
      console.error("No recognition instance available");
      alert("Speech recognition is not available.");
      return;
    }
    recognitionRef.current.stop();
  };
  const handleSaveTranscript = async () => {
    const trimmedTranscript = transcript.trim();
    if (!trimmedTranscript) {
      toast.error("Transcript is empty.");
      return;
    }

    const toastId = toast.loading("Saving transcript...");

    try {
      const res = await fetch("/api/voice-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: trimmedTranscript,
          patientId: 12,
          doctorId: 12,
          clinicId: 1,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save transcript");
      }

      toast.success("Transcript saved successfully!", { id: toastId });
    } catch (error) {
      toast.error(`Failed to save transcript: ${error.message}`, {
        id: toastId,
      });
    }
  };

  const getDuration = () => {
    if (startTime && endTime) {
      const durationInSeconds = Math.floor((endTime - startTime) / 1000);
      return `${durationInSeconds}s`;
    }
    return null;
  };

  return (
    <div className="flex items-center p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-primary mb-1">
            Live Conversation Capture
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            Doctor & Patient Dialogue
          </p>

          <div className="flex items-center justify-between gap-5 my-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded p-2"
            >
              <option value="en-US" className="text-black">
                English
              </option>
              <option value="hi-IN" className="text-black">
                Hindi
              </option>
            </select>

            <Button
              className="bg-cyan-500 hover:bg-cyan-600"
              onClick={recording ? handleStopRecording : handleStartRecording}
            >
              {recording ? "Stop Recording" : "Start Now"}
            </Button>
          </div>

          <div className="relative mb-6">
            {recording && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CircleDot className="text-red-500 animate-ping w-4 h-4" />
              </div>
            )}
            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center">
              <Mic className="text-white w-10 h-10" />
            </div>
          </div>

          <div className="flex items-center gap-[3px]">
            {barHeights.map((height, i) => (
              <motion.div
                key={i}
                className="w-1 bg-cyan-500 rounded"
                style={{ height: `${height}px` }}
                animate={recording ? { scaleY: [1, 1.8, 1] } : { scaleY: 1 }}
                transition={
                  recording
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.1,
                      }
                    : { duration: 0 }
                }
              />
            ))}
          </div>

          <div
            className="w-full max-w-sm h-1 bg-cyan-500 rounded-full my-5"
            style={{ width: "80%" }}
          />

          {startTime && (
            <p className="text-muted-foreground text-sm mb-1">
              {recording ? `Recording...` : `Duration: ${getDuration()}`}
            </p>
          )}

          {recording && (
            <p
              className="text-sm text-cyan-600 cursor-pointer"
              onClick={handleStopRecording}
            >
              Click to stop recording
            </p>
          )}

          {!recording && transcript && (
            <div className="mt-4 space-y-2 text-center">
              <p className="text-sm text-muted-foreground">Transcript:</p>
              <div className="text-sm p-2 rounded-md whitespace-pre-wrap w-full max-w-md">
                {transcript}
              </div>
            </div>
          )}
          {!recording && transcript && (
            <Button
              onClick={handleSaveTranscript}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white"
            >
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
