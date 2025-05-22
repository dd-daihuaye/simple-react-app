import React, { useState, useEffect } from 'react';
import './Carousel.css';

type CarouselProps = {
  items: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const delay = index === 0 ? 5500 : 3500;
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [index, items.length]);

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
    </div>
  );
};

export default Carousel;
