import Protected from "./components/Protected";
import Public from "./components/Public";
import useAuth from "./hooks/useAuth";

const App = () => {
  const isLogin = useAuth();
  return isLogin ? <Protected /> : <Public />
}

export default App
