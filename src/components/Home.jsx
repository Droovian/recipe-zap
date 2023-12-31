import React from "react";
import { Link } from 'react-router-dom';
import Zap from '../assets/icons8-lightning-64.png';
import ImageSlider from "./ImageSlider";

const Home = () => {
  return (
    <div className="bg-amber-300">
      <div className="relative px-6 pt-14 lg:px-8 z-100">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Your One Stop for all cooking desires
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are an open platform for passionate cooks around the world to enter their recipes.
            You can now learn to cook anything you want!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link>
                Get Started
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          
        </div>
      </div>
      <ImageSlider/>
    </div>
  );
};

export default Home;
