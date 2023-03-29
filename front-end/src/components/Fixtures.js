import React from "react";
import PropTypes from "prop-types";

import {
  List,
  Typography,
  Box,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";

const Fixtures = ({ fixtures = [] }) => {
  const groupFixturesByDate = (fixtures) => {
    const res = {};
    if (fixtures.length) {
      fixtures.forEach((game) => {
        if (res[game.date]) {
          res[game.date].push(game);
        } else {
          res[game.date] = [game];
        }
      });
    }
    return res;
  };

  const groupedFixtures = groupFixturesByDate(fixtures);

  const fixtureDates = Object.keys(groupedFixtures);

  return (
    <List>
      {fixtureDates.map((date, index) => (
        <div className="grid text-center" key={index}>
          <h4>
            {new Date(date)?.toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "2-digit",
            }) ?? ""}
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
                      {convertMilitaryTimeToStandardTime(game.time)}
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

const convertMilitaryTimeToStandardTime = (timeString) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regex pattern for military time
  if (!timeRegex.test(timeString)) {
    throw new Error("Invalid time string");
  }

  const [hours, minutes] = timeString.split(":").map(Number);

  let timeValue;
  if (hours === 0) {
    timeValue = "12";
  } else if (hours <= 12) {
    timeValue = `${hours}`;
  } else {
    timeValue = `${hours - 12}`;
  }

  timeValue += `:${minutes.toString().padStart(2, "0")}`;
  timeValue += hours >= 12 ? " PM" : " AM";

  return timeValue;
};


export default Fixtures;

Fixtures.propTypes = {
  fixtures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      home_name: PropTypes.string.isRequired,
      away_name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};
