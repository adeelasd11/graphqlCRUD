import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ChatRoom } from "./pages/ChatRoom";
import { AuthStore } from "./stores/Store";
import { useEffect } from "react";

function App() {
  const { sessionId } = AuthStore.getState();
  useEffect(() => {
    const evtSource = new EventSource(
      `${import.meta.env.VITE_BASE as string}connect?token=${sessionId}`
    );
    evtSource.onopen = (e) => {
      console.info("Connected To Server!");
    };
    evtSource.onmessage = (e) => {
      console.log(e);
    };
  });
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
