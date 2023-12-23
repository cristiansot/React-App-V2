// NutritionTipsCarousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/NutritionTipsCarousel.css';

// Array of nutrition tips to be displayed in the carousel
const tips = [
  'Include a Variety of Nutrient-Rich Foods: Ensure your diet includes a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. This provides a broad spectrum of essential nutrients, vitamins, and minerals necessary for overall health.',

  'Stay Hydrated: Drink an adequate amount of water throughout the day. Water is essential for digestion, nutrient absorption, and the elimination of waste. Limit sugary drinks and opt for water, herbal teas, or infused water for added flavor.',

  "Control Portion Sizes: Be mindful of portion sizes to avoid overeating. Use smaller plates, listen to your body's hunger and fullness cues, and avoid eating large meals late at night. Balanced portion sizes contribute to weight management and overall well-being.",

  'Limit Added Sugars and Processed Foods: Reduce the intake of foods and beverages high in added sugars and processed ingredients. Instead, choose natural sources of sweetness, and opt for whole, minimally processed foods. This helps maintain stable blood sugar levels and supports long-term health.',

  'Balance Macronutrients: Include a balance of carbohydrates, proteins, and fats in your meals. Carbohydrates provide energy, proteins support muscle health, and healthy fats contribute to satiety and nutrient absorption. A balanced ratio of macronutrients supports optimal body function.',
];

// Functional component for displaying a carousel of nutrition tips
const NutritionTipsCarousel = () => {
  // Settings for the react-slick carousel
  const settings = {
    dots: true, // Display navigation dots
    infinite: true, // Enable infinite loop
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
  };

  return (
    <div className="nutrition-tips-carousel">
      {/* React-slick Carousel */}
      <Slider {...settings}>
        {/* Map through tips array and create a slide for each tip */}
        {tips.map((tip, index) => (
          <div key={index} className="tip-card">
            <div className="tip-content">
              {/* Display tip number and tip content */}
              <p>{`Tip ${index + 1}`}</p>
              <p>{tip}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NutritionTipsCarousel;
