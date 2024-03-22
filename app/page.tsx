"use client";

import Messages from "@/components/Messages";
import Recorder from "@/components/Recorder";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { blob } from "stream/consumers";

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const uploadAudio = (blob: Blob) => {
    const url = URL.createObjectURL(blob);

    const file = new File([blob], "audio.webm", { type: blob.type });

    // Set the file value of the hidden input field
    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      // Simulate the click & submit the form
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <main className="bg-black h-screen overflow-y-auto">
      {/* Header */}
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <Image
          src="https://avatars.githubusercontent.com/u/66319691?v=4"
          height={50}
          width={50}
          alt="Profile Picture"
          className="rounded-full object-cover"
        />
        <SettingsIcon
          size={40}
          className="p-2 m-2 rounded-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-black transition-all ease-in-out duration-150"
        />
      </header>

      {/* Form */}
      <form className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-blue-950 to-black">
          <Messages />
        </div>

        {/* Hidden Fields */}
        <input type="file" name="audio" hidden ref={fileRef} />

        <button type="submit" hidden ref={submitButtonRef} />

        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl">
          {/* Recorder */}
          <Recorder uploadAudio={uploadAudio} />

          <div>{/* Voice Synthesizer - output of the assistant voice */}</div>
        </div>
      </form>
    </main>
  );
}
