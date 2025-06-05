import React, { useRef, useState } from "react";

const MagnifierImage = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [backgroundPos, setBackgroundPos] = useState("center");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setBackgroundPos("center");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[300px] md:h-[400px] rounded-md border overflow-hidden bg-no-repeat bg-cover`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: backgroundPos,
        backgroundSize: "200%",
      }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain opacity-0"
      />
    </div>
  );
};

export default MagnifierImage;
