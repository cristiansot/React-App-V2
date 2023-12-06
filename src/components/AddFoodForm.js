import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddFoodForm.css';

/* Array food --> index 0 [Portion], index 1 [Calories], index 2 [Protein], index 3 [Fat], index 4 [Carbohydrates] */

/* Cereals */
const oatmeal = [40, 146, 6.4, 2.5, 26.8];
const rise = [30, 100, 2.8, 0.2, 31.8];

/* Vegetables */
const broccoli = [55, 31, 2.5, 0.6, 6];

/* Fruts */

/* Dairy */

/* Meats */

/* Oils */

/* Sugar */

let cerealPortion = [];
let vegetablePortion = [];
let fruitPortion = [];
let dairyPortion = [];
let meatPortion = [];
let oilPortion = [];
let sugarPortion = [];

function AddFoodForm({ addFood }) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    let cereal;
    let vegetable;
    let fruit;
    let dairy;
    let meat;
    let oil;
    let sugar;

    if (data.cereal === 'oatmeal') {
      cereal = fetchCerealData(oatmeal);
    } else if (data.cereal === 'rise') {
      cereal = fetchCerealData(rise);
    }

    if (data.vegetable === 'broccoli') {
      vegetable = fetchVegetableData(broccoli);
    }

    Promise.all([cereal, vegetable, fruit, dairy, meat, oil, sugar])
      .then(([cerealResult, vegetableResult, fruitResult, dairyResult, meatResult, oilResult, sugarResult]) => {
        cerealPortion = cerealResult.map(value => value * (parseInt(data.portion) || 1));
        vegetablePortion = vegetableResult.map(value => value * (parseInt(data.portion) || 1));
        // fruitPortion = fruitResult.map(value => value * (parseInt(data.portion) || 1));
        // dairyPortion = dairyResult.map(value => value * (parseInt(data.portion) || 1));
        // meatPortion = meatResult.map(value => value * (parseInt(data.portion) || 1));
        // oilPortion = oilResult.map(value => value * (parseInt(data.portion) || 1));
        // sugarPortion = sugarResult.map(value => value * (parseInt(data.portion) || 1));

        const newFood = {
          id: uuidv4(),
          date: data.date,
          cerealName: data.cereal,
          cerealArray: cerealPortion || [0, 0, 0, 0, 0],
          vegetableName: data.vegetable,
          vegetableArray: vegetablePortion || [0, 0, 0, 0, 0],
          fruitName: data.fruit,
          fruitArray: fruitPortion || [0, 0, 0, 0, 0],
          dairyName: data.dairy,
          dairyArray: dairyPortion || [0, 0, 0, 0, 0],
          meatName: data.meat,
          meatArray: meatPortion || [0, 0, 0, 0, 0],
          oilName: data.oil,
          oilArray: oilPortion || [0, 0, 0, 0, 0],
          sugarName: data.sugar,
          sugarArray: sugarPortion || [0, 0, 0, 0, 0],
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
    var portionInputs = document.querySelectorAll(".portion");
    for (var i = 0; i < portionInputs.length; i++) {
      var input = portionInputs[i];
      input.addEventListener("change", portion);
    }

    return () => {
      // Cleanup event listeners on unmount if necessary
      portionInputs.forEach((input) => {
        input.removeEventListener("change", portion);
      });
    };
  }, []);

  function portion(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
  }

  return (
    <form className="contentForm" onSubmit={onSubmit}>
      <h1>Nutrition log</h1>
      <label>Select a date</label>
      <input type="date" {...register('date')} />

      <label>Select a cereal</label>
      <select {...register('cereal')}>
        <option value="">Select a cereal</option>
        <option value="oatmeal">Oatmeal</option>
        <option value="rise">Rise</option>
      </select>
      <input type="number" {...register('portion')} defaultValue="1" className="portion" />

      <label>Select a vegetable</label>
      <select {...register('vegetable')}>
        <option value="">Select a vegetable</option>
        <option value="broccoli">Broccoli</option>
      </select>
      <input type="number" {...register('portion')} defaultValue="1" className="portion" />
      

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

async function fetchCerealData(cereal) {
  // Simulate an asynchronous operation (replace with your actual data-fetching logic)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cereal);
    }, 300);
  });
}

async function fetchVegetableData(vegetable) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(vegetable);
    }, 300);
  });
}

async function fetchFruitData(fruit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fruit);
    }, 300);
  });
}

async function fetchDairyData(dairy) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dairy);
    }, 300);
  });
}

async function fetchMeatData(meat) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(meat);
    }, 300);
  });
}

async function fetchOilData(oil) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(oil);
    }, 300);
  });
}

async function fetchSugarData(sugar) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sugar);
    }, 300);
  });
}

export default AddFoodForm;
