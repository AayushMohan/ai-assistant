import Image from "next/image";
import activeAssistantIcon from "@/img/active.gif";
import notActiveAssistantIcon from "@/img/notactive.png";

type Props = {};

const Recorder = (props: Props) => {
  return (
    <div className="flex items-center justify-center text-white">
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
