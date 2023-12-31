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
    const { name, value, type } = e.target;
    let processedValue = value;
    if (type === 'number') {
      // Round the duration to the nearest integer, so user can't input decimal number
      processedValue = value !== '' ? Math.round(value) : null;
    }

    onFormChange(name, processedValue);
  };

  return (
    <form className="activity-form" onSubmit={onFormSubmit}>
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
        Activity:
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
        Duration (minutes):
        <input
          type="number"
          name="duration"
          value={activityInput.duration}
          onChange={handleInputChange}
        />
      </label>

      <p className="calories-burned">
        Calories burned will be automatically calculated once you submit.
      </p>

      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ActivityForm;
