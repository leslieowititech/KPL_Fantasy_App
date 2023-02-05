import { useMemo, useState } from "react";

export const useFetchFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const fixturesKey = process.env.REACT_APP_API_KEY;
  const fixturesSecret = process.env.REACT_APP_API_SECRET;
  useMemo(() => {
    const fixturesURL = `api-client/fixtures/matches.json?competition_id=37&key=${fixturesKey}&secret=${fixturesSecret}`;
    fetch(`${fixturesURL}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        if (data.success) {
          setFixtures(data.data.fixtures);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fixturesKey, fixturesSecret, setFixtures]);

  return fixtures;
};

export default useFetchFixtures;
