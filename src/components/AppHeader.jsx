import React from "react";
import { Header, Icon } from "@rneui/base";
import { Alert, View, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import { useNavigate } from "react-router-native";

const AppHeader = () => {
  const navigate = useNavigate();

  return (
    <Header
      barStyle="default"
      centerComponent={{
        text: "BRIEFING TOOLKIT",
        style: { color: "#fff", fontWeight: "bold", fontSize: 18 }
      }}
      centerContainerStyle={{}}
      containerStyle={{ width: "100%", paddingTop: Constants.statusBarHeight + 10 }}
      leftComponent={
        <View>
          <TouchableOpacity onPress={() => navigate('/')}>
            <Icon name="home" type="material" color="#fff" />
          </TouchableOpacity>
        </View>
      }
      leftContainerStyle={{}}
      linearGradientProps={{}}
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