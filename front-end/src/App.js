import logo from "./logo.svg";
import "./App.css";

import Header from "./components/Header";
import Fixtures from "./components/Fixtures";
import { useFetchFixtures } from "./hooks/useFetchFixtures.js";

function App() {
  const fixtures = useFetchFixtures();

  return (
    <div className="App">
      <Header />
      <Fixtures fixtures={fixtures} />
    </div>
  );
}

export default App;
