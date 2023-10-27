import React from "react";
import { Header, Icon } from "@rneui/base";

const AppSubHeader = (title = "Default Title") => {
    return (
        <Header
        backgroundColor="#619eff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: `${title.title}`,
          style: { color: "#fff", fontWeight: "bold" }
        }}
        containerStyle={{ width: "100%" }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="center"
        rightContainerStyle={{}}
      />
    );
}

export default AppSubHeader