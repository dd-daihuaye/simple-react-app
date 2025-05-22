import React, { useState, useEffect } from 'react';
import './Carousel.css';

type CarouselProps = {
  items: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [index, setIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(
    typeof window !== 'undefined' && window.innerWidth > 1200 ? 2 : 1
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth > 1200 ? 2 : 1);
      setIndex(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setIndex((prev) => (prev + slidesPerView) % items.length);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${index * (100 / slidesPerView)}%)`,
          width: `${(items.length * 100) / slidesPerView}%`,
        }}
      >
        {items.map((item, i) => (
          <div
            className="carousel-item"
            key={i}
            style={{
              flex: `0 0 ${100 / slidesPerView}%`,
              width: `${100 / slidesPerView}%`,
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
};

export default Carousel;
