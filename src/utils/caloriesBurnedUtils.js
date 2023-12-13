function calcCaloriesBurned(selectedActivity, activityInput, userWeight) {
  console.log(userWeight);
  const calsBurned =
    ((selectedActivity.MET * 3.5 * userWeight) / 200) * activityInput.duration;

  const roundedCalsBurned = Math.round(calsBurned);
  console.log(roundedCalsBurned);
  return roundedCalsBurned;
}

export default calcCaloriesBurned;
