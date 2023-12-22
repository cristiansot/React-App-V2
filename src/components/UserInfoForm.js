function UserInfoForm({ userInput, onFormChange, onFormSubmit }) {
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    onFormChange(name, value);
  };

  return (
    <form className="user-info-form" onSubmit={onFormSubmit}>
      <legend>Personal Info</legend>
      <label>
        Name:
        <input
          className="name-input"
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Height (cm):
        <input
          type="number"
          name="height"
          value={userInput.height}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Weight (kg):
        <input
          type="number"
          name="weight"
          value={userInput.weight}
          onChange={handleInputChange}
        />
      </label>
      <button className="submit-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default UserInfoForm;
