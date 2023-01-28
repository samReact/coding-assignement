import { ReactElement } from "react";
import { StyleSheet, Image, View, StatusBar, Switch, Text } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import colorsConstants from "../constants/colors.constants";

import Button from "./Button";

const logo = require("../assets/logo.jpeg");

type Props = {
  toggleSwitch: () => void;
  isEnabled: boolean;
};

export default function Header(props: Props): ReactElement {
  const navigate = useNavigate();
  let location = useLocation();

  let { pathname } = location;
  const { toggleSwitch, isEnabled } = props;

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        {pathname !== "/" && (
          <Button
            onPress={() => navigate("/")}
            backgroundColor="transparent"
            iconColor="#000"
            iconName="arrow-back-outline"
            style={styles.arrow}
          />
        )}
        <Image source={logo} style={styles.logo} />
        <View style={styles.switchContainer}>
          <Text style={styles.locale}>FR</Text>
          <Switch
            trackColor={{
              true: colorsConstants.secondary,
            }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.locale}>EN</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
  },
  logo: { width: 150, height: 50, justifySelf: "center" },
  arrow: {
    position: "absolute",
    left: 0,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
  },
  locale: {
    fontSize: 12,
  },
});
