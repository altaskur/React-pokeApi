import React, { useEffect, useRef } from 'react';

function ObserverComponent({ executeCallback, use, set }) {
  const monitorRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          executeCallback(use, set);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, options);
    if (monitorRef.current) {
      observer.observe(monitorRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [executeCallback, use, set]);

  return (
    <div className="monitor" ref={monitorRef} />
  );
}

export default ObserverComponent;
