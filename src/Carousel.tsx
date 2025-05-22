import React, { useState } from 'react';
import './Carousel.css';

type CarouselProps = {
  items: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${index * 371}px)` }}
      >
        {items.map((item, i) => (
          <div className="carousel-item" key={i}>
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
