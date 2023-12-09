function ActivityForm({
  activityInput,
  onFormChange,
  onFormSubmit,
  activityOptions,
  selectedActivity,
  onActivityTypeChange,
}) {
  const handleInputChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    console.log(name, value);
    onFormChange(name, value);
  };

  return (
    <form className="activity-form" onSubmit={onFormSubmit}>
      <fieldset>
        <legend>Activity Log</legend>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={activityInput.date}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Type:
          <select
            name="type"
            value={selectedActivity.activity}
            onChange={(e) => {
              const selected = activityOptions.find(
                (option) => option.activity === e.target.value
              );
              onActivityTypeChange(selected);
            }}
          >
            <option value="">Select an activity</option>
            {activityOptions.map((option) => (
              <option key={option.activity} value={option.activity}>
                {option.activity}
              </option>
            ))}
          </select>
        </label>

        <label>Intensity: {selectedActivity.intensity}</label>

        <label>
          Duration (hour):
          <input
            type="number"
            name="duration"
            value={activityInput.duration}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Calories burned:
          <input
            type="number"
            name="calories"
            value={activityInput.calories}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}

export default ActivityForm;
