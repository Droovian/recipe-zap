import React, { useState } from 'react';
import pizza from '../assets/pizza.jpeg'
import Salad from '../assets/caesar-salad.jpeg'
import egg from '../assets/egg.jpeg'
import bread from '../assets/bread.jpeg'

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const slides = [
      egg,
      bread,
      Salad,
      pizza,
    ];
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
  
    const goToPrevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };
  
    const goToNextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
  
    return (
    <div className='w-screen h-screen bg-gradient-to-t from-amber-600 to-amber-300'>
    <h1 className='p-3 text-4xl font-bold text-gray-900 sm:text-6xl  pb-32 flex justify-center pt-10'>Here are some highly loved recipes...</h1>
    <div className='flex justify-center items-center p-3'>
      <div id="default-carousel" className="w-screen lg:w-1/2 border-1  border-white rounded-md relative">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${
                index === currentSlide ? '' : 'hidden'
              } duration-700 ease-in-out`}
              data-carousel-item
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-gray-300'
              }`}
              aria-current={index === currentSlide}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={goToPrevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={goToNextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      </div>
      </div>
    );
  };

export default ImageSlider;
