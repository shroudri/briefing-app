import { React, useContext, useEffect, useState } from "react";

import { Header, Icon } from "@rneui/base";


import { AirportsContext } from "../contexts/AirportsContext";
import { ThemeContext } from "../contexts/ThemeContext";

const AppSubHeader = (props) => {
  const [isFav, setIsFav] = useState(false);
  const favAirportsContext = useContext(AirportsContext);
  const theme = useContext(ThemeContext);

  let favAirportList = favAirportsContext.favAirports;

  useEffect(() => {
    favAirportList.includes(props.icaoCode) ? setIsFav(true) : setIsFav(false);
  }, [favAirportList, props.icaoCode]);

  const handlePress = (icaoCode) => {
    favAirportList.includes(icaoCode) ? favAirportsContext.removeFavAirport(icaoCode) : favAirportsContext.addFavAirport(icaoCode);
    favAirportList.includes(icaoCode) ? setIsFav(true) : setIsFav(false);
  }

  return (
    <Header
      backgroundColor={theme.colors.appSubHeaderBackground}
      statusBarProps={{ backgroundColor: theme.colors.appHeaderBackground }}
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: `${props.icaoCode}`,
        style: { color: "#fff", fontWeight: "bold" }
      }}
      linearGradientProps={{}}
      placement="center"
      rightComponent={
        <Icon
          name={isFav ? "star" : "star-outline"}
          type="material"
          color="#fff"
          onPress={() => handlePress(props.icaoCode)}
        />
      }
    />
  );
}

export default AppSubHeader