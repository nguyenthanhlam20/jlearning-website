import React, { useState } from 'react';

const RatingStar = ({ handleChangeValue, value, disabled }) => {
  const [rating, setRating] = useState(value);

  const handleRating = (value) => {
    if (disabled !== true) {
      setRating(value);
      handleChangeValue("star", value);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleRating(value)}
          style={{ cursor: disabled !== true ? 'pointer' : 'grab', color: value <= rating ? 'gold' : 'gray', fontSize: 30 }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default RatingStar;