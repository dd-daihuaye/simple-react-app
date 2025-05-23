import React from 'react';
import './Carousel.css';
import useCarousel from './hooks/useCarousel';

type CarouselProps = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  delay?: number;
  firstDelay?: number;
};

const Carousel: React.FC<CarouselProps> = ({ items, autoPlay = true, delay, firstDelay }) => {
  const { index, next, prev } = useCarousel(items.length, { autoPlay, delay, firstDelay });

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
      <button className="prev-button" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <button className="next-button" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
};

export default Carousel;
