import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddFoodForm.css';

/* Array food --> index 0 [Portion], index 1 [Calories], index 2 [Protein], index 3 [Fat], index 4 [Carbohydrates] */

/* Cereals */
const oatmeal = [40, 153, 6.4, 2.5, 26.8];
const rice = [30, 100, 2.8, 0.2, 31.8];
const integralRice =[40, 148, 3.1, 1.1, 30.7];
const noodles = [40, 148, 5.3, 0.6, 29.9];
const bread = [60, 161, 5.2, 1.9, 30.2];
const wholemealBread = [40, 98, 4.2, 1.7, 17];
const cookedCorn = [160, 172, 5, 2, 40];
const cookedPotato = [150, 128, 2.5, 0.1, 30];
const cornFlakes = [40, 154, 3.2, 0.1, 34];

/* Vegetables */
const beet = [90, 24, 2.3, 0.2, 4.9];
const broccoli = [55, 31, 2.5, 0.6, 6];
const mushrooms = [100, 27, 2.2, 0.5, 5.1];
const cauliflower = [110, 26, 2.1, 0.2, 5.1];
const asparagus = [100, 25, 2.6, 0.3, 4.4];
const spinach = [130, 30, 3.9, 0.3, 4.9];
const pickles = [30, 20, 0.3, 0.1, 5.4];
const greenBeans = [70, 25, 1.3, 0.2, 5.5];
const tomatoSauce = [30, 25, 1.1, 0.3, 5.6];
const carrot = [50, 23, 0.5, 0.1, 5.3];
const pumpkin = [70, 22, 0.7, 0.2, 5.4];
const celery = [70, 11, 0.5, 0.1, 2.6];
const lettuce = [50, 7, 0.6, 0.1, 1.2];
const redPaprika = [60, 16, 0.5, 0.1, 3.9]
const greenPaprika = [60, 16, 0.5, 0.1, 3.9]
const cabbage = [50, 12, 0.6, 0.1, 2.7];

/* Fruts */

/* Dairy */

/* Meats */

/* Oils */

/* Sugar */

function AddFoodForm({ addFood }) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    let cerealPromise;
    let vegetablePromise;
    let fruitPromise;
    let dairyPromise;
    let meatPromise;
    let oilPromise;
    let sugarPromise;

    if (data.cereal === 'oatmeal') {
      cerealPromise = fetchFoodData(oatmeal);
    } else if (data.cereal === 'rice') {
      cerealPromise = fetchFoodData(rice);
    } else if (data.cereal === 'integralRice') {
      cerealPromise = fetchFoodData(integralRice);
    } else if (data.cereal === 'noodles') {
      cerealPromise = fetchFoodData(noodles);
    } else if (data.cereal === 'bread') {
      cerealPromise = fetchFoodData(bread);
    } else if (data.cereal === 'wholemealBread') {
      cerealPromise = fetchFoodData(wholemealBread);
    } else if (data.cereal === 'icookedCorn') {
      cerealPromise = fetchFoodData(cookedCorn);
    } else if (data.cereal === 'cookedPotato') {
      cerealPromise = fetchFoodData(cookedPotato);
    } else if (data.cereal === 'cornFlakes') {
      cerealPromise = fetchFoodData(cornFlakes);
    } else {
      cerealPromise = Promise.resolve([]);
    }

    if (data.vegetable === 'beet') {
      vegetablePromise = fetchFoodData(beet);
    } else if (data.vegetable === 'broccoli') {
      vegetablePromise = fetchFoodData(broccoli);
    } else if (data.vegetable === 'mushrooms') {
      vegetablePromise = fetchFoodData(mushrooms);
    } else if (data.vegetable === 'cauliflower') {
      vegetablePromise = fetchFoodData(cauliflower);
    } else if (data.vegetable === 'asparagus') {
      vegetablePromise = fetchFoodData(asparagus);
    } else if (data.vegetable === 'spinach') {
      vegetablePromise = fetchFoodData(spinach);
    } else if (data.vegetable === 'pickles') {
      vegetablePromise = fetchFoodData(pickles);
    } else if (data.vegetable === 'greenBeans') {
      vegetablePromise = fetchFoodData(greenBeans);
    } else if (data.vegetable === 'tomatoSauce') {
      vegetablePromise = fetchFoodData(tomatoSauce);
    } else if (data.vegetable === 'carrot') {
      vegetablePromise = fetchFoodData(carrot);
    } else if (data.vegetable === 'pumpkin') {
      vegetablePromise = fetchFoodData(pumpkin);
    } else if (data.vegetable === 'celery') {
      vegetablePromise = fetchFoodData(celery);
    } else if (data.vegetable === 'lettuce') {
      vegetablePromise = fetchFoodData(lettuce);
    } else if (data.vegetable === 'redPaprika') {
      vegetablePromise = fetchFoodData(redPaprika);
    } else if (data.vegetable === 'greenPaprika') {
      vegetablePromise = fetchFoodData(greenPaprika);
    } else if (data.vegetable === 'cabbage') {
      vegetablePromise = fetchFoodData(cabbage);
    } else {
      vegetablePromise = Promise.resolve([]);
    }

    Promise.all([cerealPromise, vegetablePromise])
      .then(([cerealResult, vegetableResult]) => {
        const portion1 = parseInt(data.portion1) || 1;
        const portion2 = parseInt(data.portion2) || 1;
        const portion3 = parseInt(data.portion3) || 1;
        const portion4 = parseInt(data.portion4) || 1;
        const portion5 = parseInt(data.portion5) || 1;
        const portion6 = parseInt(data.portion6) || 1;
        const portion7 = parseInt(data.portion7) || 1;

        const newFood = {
          id: uuidv4(),
          date: data.date,
          cerealName: data.cereal,
          cerealArray: cerealResult.map(value => value * portion1),
          vegetableName: data.vegetable,
          vegetableArray: vegetableResult.map(value => value * portion2),
        };

        console.log(newFood);

        addFood(newFood);
        reset(); // Reset all form fields
      })
      .catch((error) => {
        console.error(error);
      });
  });

  useEffect(() => {
    const portionInputs = document.querySelectorAll(".portion");
    portionInputs.forEach((input) => {
      input.addEventListener("change", handlePortionChange);
    });

    return () => {
      portionInputs.forEach((input) => {
        input.removeEventListener("change", handlePortionChange);
      });
    };
  }, []);

  const handlePortionChange = (event) => {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
  };

  const fetchFoodData = (food) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(food);
      }, 300);
    });
  };

  return (
    <form className="contentForm" onSubmit={onSubmit}>
      <h1>Nutrition log</h1>
      <label>Select a date</label>
      <input type="date" {...register('date')} />

      <label>Select a cereal</label>
      <select {...register('cereal')}>
        <option value="empty">Select a cereal</option>
        <option value="oatmeal">Oatmeal</option>
        <option value="integralRice">Integral Rice</option>
        <option value="rice">Rice</option>
        <option value="noodles">Noodles</option>
        <option value="bread">Bread</option>
        <option value="wholemealBread">Wholemeal Bread</option>
        <option value="cookedCorn">Cooked Corn</option>
        <option value="cookedPotato">Cooked Potato</option>
        <option value="cornFlakes">Corn Flakes</option>
      </select>
      <input type="number" {...register('portion1')} defaultValue="1" className="portion" />

      <label>Select a vegetable</label>
      <select {...register('vegetable')}>
        <option value="empty">Select a vegetable</option>
        <option value="beet">Beet</option>
        <option value="broccoli">Broccoli</option>
        <option value="mushrooms">Mushrooms</option>
        <option value="cauliflower">Cauliflower</option>
        <option value="asparagus">Asparagus</option>
        <option value="spinach">Spinach</option>
        <option value="pickles">Pickles</option>
        <option value="greenBeans">Green Beans</option>
        <option value="tomatoSauce">Tomato Sauce</option>
        <option value="carrot">Carrot</option>
        <option value="pumpkin">Pumpkin</option>
        <option value="celery">Celery</option>
        <option value="lettuce">Lettuce</option>
        <option value="redPaprika">Red Paprika</option>
        <option value="greenPaprika">Green Paprika</option>
        <option value="cabbage">Cabbage</option>

      </select>
      <input type="number" {...register('portion2')} defaultValue="1" className="portion" />

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddFoodForm;
