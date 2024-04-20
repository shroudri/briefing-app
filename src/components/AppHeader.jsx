import { Header, Icon } from "@rneui/base";
import Constants from "expo-constants";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";

import { ThemeContext } from "../contexts/ThemeContext";

const AppHeader = () => {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);


  return (
    <Header
      barStyle="default"
      backgroundColor={theme.colors.appHeaderBackground}
      centerComponent={{
        text: "BRIEFING TOOLKIT",
        style: { color: "#fff", fontWeight: "bold", fontSize: 18 }
      }}
      containerStyle={{ width: "100%", paddingTop: Constants.statusBarHeight + 10, borderBottomWidth: 1, borderBottomColor: theme.colors.appHeaderBackground }}
      leftComponent={
        <View>
          <TouchableOpacity onPress={() => navigate('/')}>
            <Icon name="home" type="material" color="#fff" />
          </TouchableOpacity>
        </View>
      }
      placement="center"
      rightComponent={
        <View>
          <TouchableOpacity onPress={() => navigate('/settings')}>
            <Icon name="settings" type="material" color="#fff" />
          </TouchableOpacity>
        </View>
      }
    />
  );
}


export default AppHeader