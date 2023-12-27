// MotivationalWordsCloud.js
// Reference https://www.youtube.com/watch?v=1rTaNzjGOek
import React from 'react';
import "../css/MotivationalWordsCloud.css";

// Sample data containing motivational words and their count
const data = [
  { value: 'Persistence', count: 25 },
  { value: 'Determination', count: 18 },
  { value: 'Resilience', count: 30 },
  { value: 'Commitment', count: 22 },
  { value: 'Focus', count: 27 },
  { value: 'Balance', count: 30 },
];

// Functional component for displaying a motivational words cloud
const MotivationalWordsCloud = () => (
  <div className="tag-cloud-container">
    {/* Map through the data and create a div for each motivational word */}
    {data.map((word, index) => (
      <div
        key={word.value}
        className="motivational-word-container"
        style={{
          fontSize: `${word.count}px`, // Set font size based on the count
          animationDelay: `0.${index}s`, // Adding a delay based on index for animation
        }}
      >
        {word.value}
      </div>
    ))}
  </div>
);

export default MotivationalWordsCloud;
