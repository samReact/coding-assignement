import { ReactElement } from "react";
import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Switch,
  Text,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocation, useNavigate } from "react-router-native";

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
          <TouchableOpacity onPress={() => navigate("/")} style={styles.arrow}>
            <Ionicons name={"arrow-back-outline"} size={32} />
          </TouchableOpacity>
        )}
        <Image source={logo} style={styles.logo} />
        <View style={styles.switchContainer}>
          <Text style={styles.locale}>FR</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#81b0ff"}
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
