function UserInfoForm({ userInput, onFormChange, onFormSubmit }) {
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  return (
    <form className="user-info-form" onSubmit={onFormSubmit}>
      <legend>Personal Info</legend>
      <label className="user-info-label">
        Name:
        <input
          className="name-input"
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleInputChange}
        />
      </label>

      <label className="user-info-label">
        Height (cm):
        <input
          className="userInfo-input"
          type="number"
          name="height"
          value={userInput.height}
          onChange={handleInputChange}
        />
      </label>

      <label className="user-info-label">
        Weight (kg):
        <input
          className="userInfo-input"
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
