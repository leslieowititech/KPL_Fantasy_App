import React from "react";

import {
  List,
  Typography,
  Card,
  Box,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";

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
  console.log(groupedFixtures);

  const fixtureDates = Object.keys(groupedFixtures);

  return (
    <List>
      {fixtureDates.map((date, index) => (
        <div class="grid text-center" key={index}>
          <h4>
            {new Date(date).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </h4>
          <Divider />
          {groupedFixtures[date].map((game) => (
            <div class="g-col-4" key={game.id}>
              <Grid columns={3}>
                <Grid xs={2} item>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "max-content",
                      border: "1px solid lightgrey",
                      marginRight: "4em",
                    }}
                  >
                    <Typography variant="p">{game.home_name}</Typography>
                    <Box
                      sx={{
                        border: "1px solid lightgrey",
                        maxWidth: "max-content",
                        paddingY: ".2em",
                        paddingX: ".4em",
                        marginX: ".4em",
                      }}
                    >
                      {convertMillitaryTimeToStandardTime(game.time)}
                    </Box>
                    <Typography>{game.away_name}</Typography>
                  </Box>
                </Grid>
                <Grid columns={2} sx={{ border: "1px solid red" }} xs={2} item>
                  <Grid>
                    <StadiumIcon />
                  </Grid>
                  <Grid>
                    <Typography>{game.location}</Typography>
                  </Grid>
                </Grid>
                <Grid xs={2} item>
                  <Button variant="outlined">Quick View</Button>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
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
