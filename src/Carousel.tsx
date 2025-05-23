import React from 'react';
import './Carousel.css';
import useCarousel from './hooks/useCarousel';

type CarouselProps = {
  items: React.ReactNode[];
  autoPlay?: boolean;
  delay?: number;
  firstDelay?: number;
  visibleCards?: number;
};

const cardWidth = 371;

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  delay,
  firstDelay,
  visibleCards = 1,
}) => {
  const positions = Math.max(items.length - visibleCards + 1, 1);
  const { index, next, prev } = useCarousel(positions, {
    autoPlay,
    delay,
    firstDelay,
  });

  return (
    <div
      className="carousel-container"
      style={{ width: `${cardWidth * visibleCards}px` }}
    >
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${index * cardWidth}px)` }}
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
