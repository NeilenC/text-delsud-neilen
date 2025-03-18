import React, { useState, useEffect } from "react";
import { testimonials } from "../../utils/testArrays";
import IconButton from "../styled-icon-button/IconButton";
import "./testimonialCard.css";

const TestimonialCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); 
      const handleResize = () => {
        setCardsPerView(window.innerWidth <= 840 ? 1 : 3); 
      };

      handleResize(); 

      window.addEventListener("resize", handleResize); 

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - cardsPerView, 0)); 
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + cardsPerView, testimonials.length - cardsPerView)); 
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerView);


  if (!isClient) {
    return null;
  }

  return (
    <div>
      <div className="testimonial-card-container">
        {visibleTestimonials.map((testimonial, index) => (
          <div className="testimonial-card-content" key={index}>
            <img src={testimonial.img} alt={testimonial.name} />
            <p className="testimonial-card-name">{testimonial.name}</p>
            <p className="testimonial-card-company">{testimonial.company}</p>
            <p className="testimonial-text">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>

      <div className="testimonials-component-buttons">
        <IconButton
          icon={"/arrow-back.png"}
          iconH={14}
          iconW={12}
          onClick={handlePrev}
          type="filled"
          color="var(--background-buttons)"
        />
        <IconButton
          icon={"/arrow.png"}
          iconH={14}
          iconW={12}
          onClick={handleNext}
          type="filled"
          color="var(--background-buttons)"
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
