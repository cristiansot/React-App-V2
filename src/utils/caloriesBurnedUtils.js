function calcCaloriesBurned(selectedActivity, activityInput) {
  const calsBurned =
    ((selectedActivity.MET * 3.5 * 53) / 200) * activityInput.duration;

  const roundedCalsBurned = Math.round(calsBurned);
  console.log(roundedCalsBurned);
  return roundedCalsBurned;
}

export default calcCaloriesBurned;
