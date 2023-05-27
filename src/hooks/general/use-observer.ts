import { RefObject, useEffect } from "react";

type IUseObserver = {
  ref: RefObject<HTMLElement>;
  onIntersect: () => void;
};

export const useObserver = ({ onIntersect, ref }: IUseObserver) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);
};
