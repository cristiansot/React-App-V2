function UserInfo({ userInfo }) {
  return (
    <div className="user-info">
      <h2>{userInfo && userInfo.name}</h2>
      <p>Height: {userInfo && userInfo.height} cm</p>
      <p>Weight: {userInfo && userInfo.weight} kg</p>
    </div>
  );
}

export default UserInfo;
