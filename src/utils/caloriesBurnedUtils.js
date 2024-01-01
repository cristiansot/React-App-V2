function calcCaloriesBurned(selectedActivity, activityInput, userWeight) {
  const calsBurned =
    ((selectedActivity.MET * 3.5 * userWeight) / 200) * activityInput.duration;

  const roundedCalsBurned = Math.round(calsBurned);
  return roundedCalsBurned;
}

export default calcCaloriesBurned;
