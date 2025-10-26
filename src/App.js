import React, { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import Desktop from "./components/Desktop";
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Desktop /> : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}








