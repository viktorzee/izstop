import { useRef, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "intersection-observer";

export const VideoObserver = ({ src, type, className, id }) => {
  const [inViewRef, inView] = useInView({
    threshold: 1,
  });
  const videoRef = useRef();

  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      videoRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);

      if (node) {
        node.addEventListener("click", function () {
          if (this.paused) {
            this.play();
          } else {
            this.pause();
          }
        });
      }
    },
    [inViewRef]
  );

  useEffect(() => {
    if (!videoRef || !videoRef.current) {
      return;
    }

    if (inView) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <figure>
      <video loop muted autoPlay ref={setRefs} className={className} id={id}>
        <source src={src} type={type} />
      </video>
    </figure>
  );
};
