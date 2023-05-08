import classNames from "classnames";
import { useEffect, useRef } from "react";
import styles from "./VideoTag.module.scss"

function VideoTag(props) {
  const video = useRef();
  const srcObject = props.srcObject;
  const src = props.src;
  const style = props.style;

  const { isLocalVideoStream } = props


  function handleCanPlay() {
    video.current.play();
  }

  useEffect(() => {
    if (srcObject && video.current) {
      video.current.srcObject = srcObject;
    }
  });

  return (
    <>
      <video
        ref={video}
        onCanPlay={handleCanPlay}
        playsInline
        autoPlay={true}
        src={src}
        className={isLocalVideoStream && styles.myVideo}
      />
    </>
  );
}

export default VideoTag;