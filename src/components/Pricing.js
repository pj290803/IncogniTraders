import React, { useState } from 'react';

const PricingModel = () => {
  const [selectedOption, setSelectedOption] = useState('basic');

  const pricingOptions = [
    { id: 'basic', name: 'Basic Plan', price: 10, description: 'Best for starters,works for 10 transactions' },
    { id: 'standard', name: 'Standard Plan', price: 20, description: 'Great value for most users which works for 25 transactions' },
    { id: 'premium', name: 'Premium Plan', price: 40, description: 'Top-tier features and support which works for 50 transactions' },
  ];

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="container">
      <h2>Pricing Model</h2>
      <div className="options-container">
        {pricingOptions.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption === option.id ? 'selected-option' : ''}`}
            onClick={() => handleOptionChange(option.id)}
          >
            <input
              type="radio"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
            <h3>{option.name}</h3>
            <p>${option.price}/month</p>
            <p className="description">{option.description}</p>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Selected Plan: {selectedOption}</h3>
        <h3>Total Price: ${pricingOptions.find((option) => option.id === selectedOption).price}/month</h3>
      </div>
    </div>
  );
};

export default PricingModel;
