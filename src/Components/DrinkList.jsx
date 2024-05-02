import React, { useState, useEffect } from "react";
import "./Style.css";

const DrinkLists = () => {
  const [drinks, setDrinks] = useState([]);
  const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setDrinks(data.drinks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDrinks();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    }, 6000);

    setIntervalId(interval)

    return () => clearInterval(interval);
  }, [drinks]);

  const handlePrevClick = () => {
    setCurrentDrinkIndex(
      (prevIndex) => (prevIndex - 1 + drinks.length) % drinks.length
    );
  };

  const handleNextClick = () => {
    setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
    if(intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
    }
  };

  return (
    <div className="drink-list">
      <div className="caption"></div>
      {drinks.map((drink, index) => (
        <div
          key={drink.idDrink}
          className={`drink-item ${
            index === currentDrinkIndex ? "active" : ""
          }`}
        >
          <h3 className="h3">{drink.strDrink}</h3>
          <img src={drink.strDrinkThumb} alt={drink.strDrink} className="img" />

          {showDetails && (
            <div className="details">
              <p className="overlay">Details: {drink.strInstructions}</p>
            </div>
          )}

          <div className="btns">
            <button className="prev" onClick={handlePrevClick}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
              />

              <span class="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="det" onClick={handleDetails}>
              {" "}
              Details
            </button>
            <button className="next" onClick={handleNextClick}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
              />

              <span class="material-symbols-outlined">arrow_forward</span>      
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrinkLists;
