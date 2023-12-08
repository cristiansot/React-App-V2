function ActivityForm({ activityInput, onFormChange, onFormSubmit }) {
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
          <input
            type="string"
            name="type"
            value={activityInput.type}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Duration:
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
