import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  onClick?: () => void;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image" onClick={props.onClick}>
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor={"disable"}
      >
        <div className="work-link">
          <MdArrowOutward />
        </div>
        <img src={props.image} alt={props.alt} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </div>
    </div>
  );
};

export default WorkImage;
