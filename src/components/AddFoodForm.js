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
const olives = [55, 64, 0.8, 7, 0.7];
const cherries = [90, 65, 1.1, 0.9, 14.9];
const custardApple = [90, 50, 2.6, 0.5, 10.5];
const plums = [110, 61, 0.9, 0.7, 14.3];
const peach = [130, 56, 0.9, 0.1, 14.4];
const strawberries = [100, 30, 0.6, 0.3, 7];
const apple = [100, 59, 0.2, 0.4, 15];
const melon = [180, 63, 1.6, 0.5, 15];
const orange = [120, 56, 1.1, 0.1, 14];
const pear = [100, 59, 0.4, 0.4, 15];
const pineapple = [120, 59, 0.5, 0.5, 15];
const waterMelon = [100, 32, 0.6, 0.4, 7];
const grapes = [90, 57, 0.6, 0.3, 15];

/* Dairy */
const wholeMilk = [200, 122, 6.6, 6.7, 9.3];
const yogurt = [175, 107, 6.1, 5.7, 8.2];
const butteryCheese = [31, 110, 7.7, 8.5, 0.7];
const cheddarCheese = [28, 110, 7.3, 7.8, 0.7];
const goatCheese = [30, 100, 7.4, 7.8, 0.1];
const parmesanCheese = [24, 110, 7.5, 8.1, 1.8];
const swissCheese = [25, 96, 7.1, 7.2, 0.8];
const creamCheese = [14, 48, 1.1, 4.9, 0.4];
const curdCheese = [60, 61, 7.5, 2.7, 1.6];
const yogurtFruit = [175, 200, 7.2, 4.9, 31.9];
const custard = [130, 146, 3.8, 2.5, 27.2];

/* Meats */
const beef = [50, 68, 10.9, 2.7, 0.45];
const mutton = [50, 129, 12.7, 8.2, 0];
const pork = [50, 146, 12.5, 10.3, 0];
const lambLiver = [60, 132, 18.3, 5.2, 1.5];
const ham = [40, 93.2, 6.4, 7.5, 0.1];
const sausage = [45, 194, 6, 17.4, 3.1];
const salami = [20, 86, 4.2, 7.5, 0.4];
const turkeySausage = [40, 89, 5.7, 7, 0.5];
const trout = [80, 104, 15, 4.8, 0.4];
const tuna = [50, 144, 10, 11, 0.3];
const mackerel = [50, 139, 11, 10.5, 0.3];
const sardine = [50, 154, 10.6, 12.3, 0.3];
const salmon = [80, 146, 15.9, 8, 0];
const chikenLeg = [50, 99, 11, 5.7, 0.7];
const chickenBreast = [50, 65.1, 11, 1.9, 0.8];
const turkeyLeg = [50, 61, 11, 1.6, 0.6];
const eggs = [50, 80, 6.7, 5, 2];
const shrimp = [60, 66, 14.2, 1, 0]
const oysters = [70, 56, 6.6, 1.6, 3.4];
const clams = [60, 44.4, 7.6, 0.5, 1.5];
const lentils = [50, 169, 14, 0.4, 28.4];

/* Oils */
const wonderOil = [20, 179, 0, 19, 0];
const soyOil = [20, 179, 0, 19, 0];
const oliveOil = [20, 179, 0, 6, 0];
const canolaOil = [20, 177, 0, 20, 0];
const lard = [20, 180, 0, 19, 0];
const vegetableShortening = [20, 179, 0, 19, 0];
const butter = [24, 180, 0.2, 19, 0];
const margarine = [24, 172, 0.19, 19, 0.1];
const mayonnaise = [28, 201, 0.3, 22, 0.7];
const bacon = [30, 172, 9.1, 14.7, 0.17];
const poultryPate = [40, 164, 3.2, 16.8, 0];
const almonds = [25, 142, 4.5, 10.8, 6.7];
const saltyAlmonds = [25, 142, 4.5, 10.8, 6.7];
const peanut = [30, 176, 7.1, 14.9, 6.4];
const saltyPeanut = [30, 171, 7.8, 14.8, 4.7];
const nut = [25, 152, 6, 14.1, 3];
const pistachio = [30, 173, 6.1, 14.5, 7.4];
const avocado = [90, 145, 1.7, 13, 6.6];

/* Sugar */
// const
// const
// const
// const
// const
// const
// const
// const
// const
// const
// const
// const
// const

function AddFoodForm({ addFood }) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    let cerealPromise, vegetablePromise, fruitPromise,  dairyPromise, meatPromise, oilPromise, sugarPromise;

    /* Cereal condition */
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

    /* Vegetable condition */
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

    /* Fruits condition */
    if (data.fuit === 'olives') {
      fruitPromise = fetchFoodData(olives);
    } else if (data.fruit === 'cherries') {
      fruitPromise = fetchFoodData(cherries);
    } else if (data.fruit === 'custardApple') {
      fruitPromise = fetchFoodData(custardApple);
    } else if (data.fruit === 'plums') {
      fruitPromise = fetchFoodData(plums);
    } else if (data.fruit === 'peach') {
      fruitPromise = fetchFoodData(peach);
    } else if (data.fruit === 'strawberries') {
      fruitPromise = fetchFoodData(strawberries);
    } else if (data.fruit === 'apple') {
      fruitPromise = fetchFoodData(apple);
    } else if (data.fruit === 'melon') {
      fruitPromise = fetchFoodData(melon);
    } else if (data.fruit === 'orange') {
      fruitPromise = fetchFoodData(orange);
    } else if (data.fruit === 'pear') {
      fruitPromise = fetchFoodData(pear);
    } else if (data.fruit === 'pineapple') {
      fruitPromise = fetchFoodData(pineapple);
    } else if (data.fruit === 'waterMelon') {
      fruitPromise = fetchFoodData(waterMelon);
    } else if (data.fruit === 'grapes') {
      fruitPromise = fetchFoodData(grapes);
    } else {
      fruitPromise = Promise.resolve([]);
    }

    /* Dairy condition */
    if (data.dairy === 'wholeMilk') {
      dairyPromise = fetchFoodData(wholeMilk);
    } else if (data.dairy === 'yogurt') {
      dairyPromise = fetchFoodData(yogurt);
    } else if (data.dairy === 'butteryCheese') {
      dairyPromise = fetchFoodData(butteryCheese);
    } else if (data.dairy === 'cheddarCheese') {
      dairyPromise = fetchFoodData(cheddarCheese);
    } else if (data.dairy === 'goatCheese') {
      dairyPromise = fetchFoodData(goatCheese);
    } else if (data.dairy === 'parmesanCheese') {
      dairyPromise = fetchFoodData(parmesanCheese);
    } else if (data.dairy === 'swissCheese') {
      dairyPromise = fetchFoodData(swissCheese);
    } else if (data.dairy === 'creamCheese') {
      dairyPromise = fetchFoodData(creamCheese);
    } else if (data.dairy === 'curdCheese') {
      dairyPromise = fetchFoodData(curdCheese);
    } else if (data.dairy === 'yogurtFruit') {
      dairyPromise = fetchFoodData(yogurtFruit);
    } else if (data.dairy === 'custard') {
      dairyPromise = fetchFoodData(custard);
    } else {
      dairyPromise = Promise.resolve([]);
    }

    /* Meats condition */
    if (data.meat === 'beef') {
      meatPromise = fetchFoodData(beef);
    } else if (data.meat === 'mutton') {
      meatPromise = fetchFoodData(mutton);
    } else if (data.meat === 'pork') {
      meatPromise = fetchFoodData(pork);
    } else if (data.meat === 'lambLiver') {
      meatPromise = fetchFoodData(lambLiver);
    } else if (data.meat === 'ham') {
      meatPromise = fetchFoodData(ham);
    } else if (data.meat === 'sausage') {
      meatPromise = fetchFoodData(sausage);
    } else if (data.meat === 'salami') {
      meatPromise = fetchFoodData(salami);
    } else if (data.meat === 'turkeySausage') {
      meatPromise = fetchFoodData(turkeySausage);
    } else if (data.meat === 'trout') {
      meatPromise = fetchFoodData(trout);
    } else if (data.meat === 'tuna') {
      meatPromise = fetchFoodData(tuna);
    } else if (data.meat === 'mackerel') {
      meatPromise = fetchFoodData(mackerel);
    } else if (data.meat === 'sardine') {
      meatPromise = fetchFoodData(sardine);
    } else if (data.meat === 'salmon') {
      meatPromise = fetchFoodData(salmon);
    } else if (data.meat === 'chickenLeg') {
      meatPromise = fetchFoodData(chikenLeg);
    } else if (data.meat === 'chickenBreast') {
      meatPromise = fetchFoodData(chickenBreast);
    } else if (data.meat === 'turkeyLeg') {
      meatPromise = fetchFoodData(turkeyLeg);
    } else if (data.meat === 'eggs') {
      meatPromise = fetchFoodData(eggs);
    } else if (data.meat === 'shrimp') {
      meatPromise = fetchFoodData(shrimp);
    } else if (data.meat === 'oysters') {
      meatPromise = fetchFoodData(oysters);
    } else if (data.meat === 'clams') {
      meatPromise = fetchFoodData(clams);
    } else if (data.meat === 'lentils') {
      meatPromise = fetchFoodData(lentils);
    } else {
      meatPromise = Promise.resolve([]);
    }

    /* Oils condition */
    if (data.oil === 'wonderOil') {
      oilPromise = fetchFoodData(wonderOil);
    } else if (data.oil === 'soyOil') {
      oilPromise = fetchFoodData(soyOil);
    } else if (data.oil === 'oliveOil') {
      oilPromise = fetchFoodData(oliveOil);
    } else if (data.oil === 'canolaOil') {
      oilPromise = fetchFoodData(canolaOil);
    } else if (data.oil === 'lard') {
      oilPromise = fetchFoodData(lard);
    } else if (data.oil === 'vegetableShortening') {
      oilPromise = fetchFoodData(vegetableShortening);
    } else if (data.oil === 'butter') {
      oilPromise = fetchFoodData(butter);
    } else if (data.oil === 'margarine') {
      oilPromise = fetchFoodData(margarine);
    } else if (data.oil === 'mayonnaise') {
      oilPromise = fetchFoodData(mayonnaise);
    } else if (data.oil === 'bacon') {
      oilPromise = fetchFoodData(bacon);
    } else if (data.oil === 'poultryPate') {
      oilPromise = fetchFoodData(poultryPate);
    } else if (data.oil === 'almonds') {
      oilPromise = fetchFoodData(almonds);
    } else if (data.oil === 'saltyAlmonds') {
      oilPromise = fetchFoodData(saltyAlmonds);
    } else if (data.oil === 'peanut') {
      oilPromise = fetchFoodData(peanut);
    } else if (data.oil === 'saltyPeanut') {
      oilPromise = fetchFoodData(saltyPeanut);
    } else if (data.oil === 'nut') {
      oilPromise = fetchFoodData(nut);
    } else if (data.oil === 'pistachio') {
      oilPromise = fetchFoodData(pistachio);
    } else if (data.oil === 'avocado') {
      oilPromise = fetchFoodData(avocado);
    } else {
      oilPromise = Promise.resolve([]);
    }

    Promise.all([cerealPromise, vegetablePromise, fruitPromise, dairyPromise, meatPromise, oilPromise])
      .then(([cerealResult, vegetableResult, fruitResult, dairyResult, meatResult, oilResult]) => {
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
          fruitName: data.fruit,
          fruitArray: fruitResult.map(value => value * portion3),
          dairyName: data.dairy,
          dairyArray: dairyResult.map(value => value * portion4),
          meatName: data.meat,
          meatArray: meatResult.map(value => value * portion5),
          oilName: data.oil,
          oilArray: oilResult.map(value => value * portion6),
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
      <div id='dateContent'>
        <label>Select a date</label>
        <input type="date" id='date' {...register('date')} />
      </div>
      
      <div id='cereal'>
        <select {...register('cereal')}>
          <option value="empty">Select a Cereal</option>
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
        <input type="number" {...register('portion1')} defaultValue="1" className="portion" id='quantity' />
      </div>
     
      <div id='vegetable'>
        <select {...register('vegetable')}>
          <option value="empty">Select a Vegetable</option>
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
        <input type="number" {...register('portion2')} defaultValue="1" className="portion" id='quantity' />
      </div>
      
      <div id='fruit'>
        <select {...register('fruit')}>
          <option value="empty">Select a Fruit</option>
          <option value="olives">Olives</option>
          <option value="cherries">Cherries</option>
          <option value="custardApple">Custard Apple</option>
          <option value="plums">Plums</option>
          <option value="peach">Peach</option>
          <option value="strawberries">Strawberries</option>
          <option value="apple">Apple</option>
          <option value="melon">Melon</option>
          <option value="orange">Orange</option>
          <option value="pear">Pear</option>
          <option value="pineapple">Pinapple</option>
          <option value="waterMelon">Watermelon</option>
          <option value="grapes">Grapes</option>
        </select>
        <input type="number" {...register('portion3')} defaultValue="1" className="portion" id='quantity' />
      </div>

      <div id='dairy'>
        <select {...register('dairy')}>
          <option value="empty">Select a Dairy</option>
          <option value="wholeMilk">Whole Milk</option>
          <option value="yogurt">Yogurt</option>
          <option value="butteryCheese">Buttery Cheese</option>
          <option value="cheddarCheese">Cheddar Cheese</option>
          <option value="goatCheese">Goat Cheese</option>
          <option value="parmesanCheese">Parmesan Cheese</option>
          <option value="swissCheese">Swiss Cheese</option>
          <option value="creamCheese">Cream Cheese</option>
          <option value="curdCheese">Curd Cheese</option>
          <option value="yogurtFruit">Yogurt Fruit</option>
          <option value="custard">Custard</option>
        </select>
        <input type="number" {...register('portion4')} defaultValue="1" className="portion" id='quantity' />
      </div>

      <div id='meat'>
        <select {...register('meat')}>
          <option value="empty">Select a Meat</option>
          <option value="beef">Beef</option>
          <option value="mutton">Mutton</option>
          <option value="pork">Pork</option>
          <option value="lambLiver">Lamb Liver</option>
          <option value="ham">Ham</option>
          <option value="sausage">Sausage</option>
          <option value="salami">Salami</option>
          <option value="turkeySausage">Turkey Sausage</option>
          <option value="trout">Trout</option>
          <option value="tuna">Tuna</option>
          <option value="mackerel">Mackerel</option>
          <option value="sardine">Sardine</option>
          <option value="salmon">Salmon</option>
          <option value="chickenLeg">Chicken Leg</option>
          <option value="chickenBreast">Chicken Breast</option>
          <option value="turkeyLeg">Turkey Leg</option>
          <option value="eggs">Eggs</option>
          <option value="shrimp">Shrimp</option>
          <option value="oysters">Oysters</option>
          <option value="clams">Clams</option>
          <option value="lentils">Lentils</option>
        </select>
        <input type="number" {...register('portion5')} defaultValue="1" className="portion" id='quantity' />
      </div>

      <div id='oil'>
        <select {...register('oil')}>
          <option value="empty">Select an Oil</option>
          <option value="wonderOil">Wonder Oil</option>
          <option value="soyOil">Soy Oil</option>
          <option value="oliverOil">Oliver Oil</option>
          <option value="lard">Lard</option>
          <option value="vegetableShortening">Vegetable Shortening</option>
          <option value="butter">Butter</option>
          <option value="margarine">Margarine</option>
          <option value="mayonnaise">Mayonnaise</option>
          <option value="bacon">Bacon</option>
          <option value="poultryPate">Poultry Pate</option>
          <option value="almonds">Almonds</option>
          <option value="saltyAlmonds">Salty Almonds</option>
          <option value="peanut">Peanut</option>
          <option value="saltyPeanut">Salty Peanut</option>
          <option value="nut">Nuts</option>
          <option value="pistachio">Pistachio</option>
          <option value="avocado">Avocado</option>
        </select>
        <input type="number" {...register('portion5')} defaultValue="1" className="portion" id='quantity' />
      </div>

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddFoodForm;
