import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onPress: () => void;
  iconColor: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  style?: object;
};

export default function Button(props: Props) {
  const { onPress, iconColor, iconName, backgroundColor, style } = props;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }, { ...style }]}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={32} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
  },
});
