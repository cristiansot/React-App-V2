function UserInfoForm({ userInput, onFormChange, onFormSubmit }) {
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    onFormChange(name, value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset>
        <legend>Personal Info</legend>
        <label>
          Name:
          <input
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
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
}

export default UserInfoForm;
