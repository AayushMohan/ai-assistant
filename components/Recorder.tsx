import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export const mimeType = "audio/webm";

const Recorder = ({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const { pending } = useFormStatus();
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

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
    // || mediaRecorder === null

    setRecordingStatus("recording");

    // Create a new media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];

    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    if (mediaRecorder.current === null || pending) return;

    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className="flex items-center justify-center text-white">
      {!permission && (
        <button onClick={getMicrophonePermission} className="">
          Get Microphone
        </button>
      )}

      {pending && (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          width={350}
          height={350}
          priority
          className="assistant grayscale"
        />
      )}

      {permission && recordingStatus === "inactive" && !pending && (
        <Image
          src={notActiveAssistantIcon}
          alt="Not Recording"
          width={350}
          height={350}
          onClick={startRecording}
          priority={true}
          className="assistant cursor-pointer hover:scale-110 transition-all ease-in-out duration-150"
        />
      )}

      {recordingStatus === "recording" && (
        <Image
          src={activeAssistantIcon}
          alt="Recording"
          width={350}
          height={350}
          onClick={stopRecording}
          priority={true}
          className="assistant cursor-pointer hover:scale-110 transition-all ease-in-out duration-150"
        />
      )}
    </div>
  );
};

export default Recorder;
