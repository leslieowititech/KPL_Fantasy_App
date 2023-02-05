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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
