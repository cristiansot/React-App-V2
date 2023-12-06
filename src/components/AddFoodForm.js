import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import '../css/AddFoodForm.css';

const oatmeal = [40, 146, 6.4, 2.5, 26.8];

function AddFoodForm({ addFood }) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    const newfood = {
      id: uuidv4(),
      date: data.date,
      cereals: data.cereals,
    };

    addFood(newfood);
    reset(); // Reset all form fields
  });

/* https://chat.openai.com/share/f5e2b17a-3385-4852-919d-44af03096492 */
  useEffect(() => {
    var quantityInputs = document.querySelectorAll(".quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener("change", quantityCereal);
    }

    return () => {
      // Cleanup event listeners on unmount if necessary
      quantityInputs.forEach((input) => {
        input.removeEventListener("change", quantityCereal);
      });
    };
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  function quantityCereal(event) {
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
      <select {...register('cereals')}>
        <option value="oatmeal">Oatmeal</option>
      </select>
      <input type="number" defaultValue="1" className="quantity" />

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AddFoodForm;
