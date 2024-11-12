import { useState, useEffect } from "react";

function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 5000; // change slide every 2 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <div className="h-full relative">
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-full h-full rounded-lg"
      ></div>
    </div>
  );
}

export default ImageSlider;
