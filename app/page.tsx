import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* Header */}
      <header>
        <Image
          src="https://avatars.githubusercontent.com/u/66319691?v=4"
          height={50}
          width={50}
          alt="Profile Picture"
          className="rounded-full"
        />
      </header>

      {/* Form */}
    </main>
  );
}
