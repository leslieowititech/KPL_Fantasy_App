import { useEffect, useState } from "react";

const CACHE_EXPIRATION = 600000; // 10 minutes in milliseconds
const CACHE_KEY = "matchDataCache";
const fixturesKey = process.env.REACT_APP_API_KEY;
const fixturesSecret = process.env.REACT_APP_API_SECRET;
const fixturesURL = `api-client/fixtures/matches.json?competition_id=37&key=${fixturesKey}&secret=${fixturesSecret}`;

export const useNewFetchFixtures = () => {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));

    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION) {
      setMatchData(cachedData.data);
    } else {
      fetchMatchData();
    }
  }, []);

  async function fetchMatchData() {
    const response = await fetch(fixturesURL);
    const data = await response.json();
    setMatchData(data);
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  }

  return matchData;
};
