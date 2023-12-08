function UserInfo({ userInfo }) {
  return (
    <div className="user-info">
      <h2>Personal Info</h2>
      <p>Name: {userInfo && userInfo.name}</p>
      <p>Height: {userInfo && userInfo.height} cm</p>
      <p>Weight: {userInfo && userInfo.weight} kg</p>
    </div>
  );
}

export default UserInfo;
