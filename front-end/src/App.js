import {useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';

function App() {
  const fixturesURL = "api-client/fixtures/matches.json?competition_id=37&key=yu96VQtg9w5X1Kg5&secret=ZveiqH7aCOdGDFFcaOi5EMmOirLkc1pb"
  const [fixtures, setFixtures] = useState([]);

 useEffect(() => {
     fetch(fixturesURL,{
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
     })
      .then(response => {
        if(response.ok){
          return response.json()
        }
        throw response
      })
      .then(data => {
        if(data.success){
          setFixtures(data.data.fixtures)
        }
      })
      .catch(error => {
        console.error(error)
      })
 },[setFixtures,fixturesURL])

 console.log(fixtures)

  return (
    <div className="App">
      <Header/>
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
