import React, { useState } from "react";
import Login from "./components/Login";
import MakerCheckerDashboard from "./components/MakerCheckerDashboard/MakerCheckerDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <MakerCheckerDashboard user={user} />
      )}
    </div>
  );
}

export default App;
