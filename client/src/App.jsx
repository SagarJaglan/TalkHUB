import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfileThunk } from "./store/slice/user/user.thunk";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(getProfileThunk());
    })();
  }, []);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}

export default App;
