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

  return (
    <div className="work-image" onClick={props.onClick} onMouseEnter={() => setIsVideo(true)} onMouseLeave={() => setIsVideo(false)}>
      <div
        className="work-image-in"
        data-cursor={"disable"}
      >
        <div className="work-link">
          <MdArrowOutward />
        </div>
        <img 
          src={props.image} 
          alt={props.alt} 
          loading="lazy" 
          decoding="async"
        />
        {isVideo && props.video && (
          <video 
            src={props.video.startsWith('http') ? props.video : `/videos/${props.video}`} 
            autoPlay 
            muted 
            playsInline 
            loop 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
          />
        )}
      </div>
    </div>
  );
};

export default WorkImage;
