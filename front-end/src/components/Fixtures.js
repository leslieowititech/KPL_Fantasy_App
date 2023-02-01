import React from "react";
import {
  List,
  ListItem,
  Typography,
  Card,
  ListItemText,
  Box,
} from "@mui/material";

const Fixtures = ({ fixtures }) => {
  const groupFixturesByDate = (fixtures) => {
    const res = {};
    fixtures.forEach((game) => {
      if (res[game.date]) {
        res[game.date].push(game);
      } else {
        res[game.date] = [game];
      }
    });
    return res;
  };

  const groupedFixtures = groupFixturesByDate(fixtures);

  const fixtureDates = Object.keys(groupedFixtures);

  return (
    <List>
      {fixtureDates.map((date, index) => (
        <Card key={index}>
          <Typography>
            {new Date(date).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Typography>
          {groupedFixtures[date].map((game) => (
            <List key={game.id}>
              <Box sx={{ display: "flex", flexDirection: "row",alignItems:"center",border:"1px solid red" }}>
                <Typography>{game.home_name}</Typography>
                <Box sx={{ border: "1px solid grey", maxWidth: "max-content" }}>
                  {convertMillitaryTimeToStandardTime(game.time)}
                </Box>
                <Typography>{game.away_name}</Typography>
              </Box>
            </List>
          ))}
        </Card>
      ))}
    </List>
  );
};

const convertMillitaryTimeToStandardTime = (timeString) => {
  const time = timeString.split(":");
  const hours = Number(time[0]);
  const minutes = Number(time[1]);

  let timeValue;
  if (hours > 0 && hours <= 22) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours === 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  //timeValue += hours >= 12 ? " P.M." : " A.M."; // get AM/PM

  return timeValue;
};

export default Fixtures;
