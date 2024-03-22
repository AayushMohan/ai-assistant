import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const Recorder = ({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) => {
  const { pending } = useFormStatus();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await window.navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("The media recorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    if (stream === null || pending) return;

    setRecordingStatus("recording");
  };

  return (
    <div className="flex items-center justify-center text-white">
      {!permission && (
        <button onClick={getMicrophonePermission} className="">
          Get Microphone
        </button>
      )}
      <Image
        src={activeAssistantIcon}
        alt="Recording"
        width={350}
        height={350}
        priority
      />
    </div>
  );
};

export default Recorder;
