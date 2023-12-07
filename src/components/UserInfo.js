function UserInfo({ userInfo }) {
  return (
    <div>
      <h2>Personal Info</h2>
      <p>Name: {userInfo && userInfo.name}</p>
      <p>Height: {userInfo && userInfo.height}</p>
      <p>Weight: {userInfo && userInfo.weight}</p>
    </div>
  );
}

export default UserInfo;
