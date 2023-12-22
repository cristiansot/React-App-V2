function UserInfo({ userInfo }) {
  return (
    <div className="user-info">
      <h2>{userInfo && userInfo.name}</h2>
      <div className="weight-height">
        <p>{userInfo && userInfo.height} cm</p>
        <p>{userInfo && userInfo.weight} kg</p>
      </div>
    </div>
  );
}

export default UserInfo;
