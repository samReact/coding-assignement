import React, { ReactElement, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  document: {
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
  };
};

export default function DocumentModal(props: Props): ReactElement {
  const { title, description, updatedAt, createdAt } = props.document;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name="close-circle-outline" size={42} />
          </Pressable>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <Text style={styles.modalText}>{updatedAt}</Text>
          <Text style={styles.modalText}>{createdAt}</Text>
        </View>
      </Modal>
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="create-outline" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.backRightBtn, styles.backRightBtnRight]}
        >
          <Ionicons name="eye-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
  },

  modalView: {
    flex: 1,
    padding: 12,
  },
  textStyle: {
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  backRightBtnLeft: {
    backgroundColor: "orange",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "green",
    right: 0,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    width: 75,
  },
  rowBack: {
    backgroundColor: "#DDD",
    height: "100%",
  },
});
