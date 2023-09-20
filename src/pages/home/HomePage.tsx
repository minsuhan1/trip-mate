import { signOut } from "../../utils/auth/firebase";

const handleLogout = () => {
  signOut();
};

function HomePage() {
  return (
    <>
      <div>HomePage</div>
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
}

export default HomePage;
