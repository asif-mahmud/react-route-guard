import { ReactLocation, Router } from "@tanstack/react-location";
import { Layout } from "./Layout";
import { Routes } from "./Routes";

const location = new ReactLocation();

function App() {
  return (
    <Router routes={Routes} location={location}>
      <Layout />
    </Router>
  );
}

export default App;
