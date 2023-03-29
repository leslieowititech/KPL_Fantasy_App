import logo from "./logo.svg";
import "./App.css";

import Header from "./components/Header";
import Fixtures from "./components/Fixtures";
import { useFetchFixtures } from "./hooks/useFetchFixtures.js";
import { useNewFetchFixtures } from "./hooks/newUseFetchFixtures";

function App() {
  const fixtures = useFetchFixtures();
  const matchData = useNewFetchFixtures();

  console.log(matchData,'[00000000]')

  return (
    <div className="App">
      <Header />
      <Fixtures fixtures={matchData} />
    </div>
  );
}

export default App;
