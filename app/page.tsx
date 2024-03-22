import { SettingsIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
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
      <form>
        <div>{/* Messages */}</div>

        {/* Hidden Fields */}
        <input type="file" />
        <button type="submit" hidden />

        <div>
          {/* Recorder */}

          {/* Voice Synthesizer - output of the assistant voice */}
        </div>
      </form>
    </main>
  );
}
