import { ReactElement, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DOCUMENTS_MUTATION, DOCUMENTS_QUERY } from "../gql/Queries";
import { useMutation } from "@apollo/client";

type Props = {
  document: {
    id: string;
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
  };
};

export default function DocumentModal(props: Props): ReactElement {
  const { id, title, description, updatedAt, createdAt } = props.document;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);
  const [updatedDescription, setUpdatedDescription] =
    useState<string>(description);

  const [documentMutation, { data, loading, error }] = useMutation(
    DOCUMENTS_MUTATION,
    {
      refetchQueries: [{ query: DOCUMENTS_QUERY }],
    }
  );

  function handleSave(): void {
    if (!editable) {
      return setEditable(true);
    }
    documentMutation({
      variables: { id, title: updatedTitle, description: updatedDescription },
    });
    // setEditable(false);
    // setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onDismiss={() => setEditable(false)}
      >
        <View style={styles.modalView}>
          <Pressable
            onPress={() => {
              setEditable(false);
              setModalVisible(!modalVisible);
            }}
          >
            <Ionicons name="close-circle-outline" size={42} />
          </Pressable>
          {editable ? (
            <TextInput
              style={styles.input}
              onChangeText={setUpdatedTitle}
              value={updatedTitle}
            />
          ) : (
            <Text style={styles.modalText}>{title}</Text>
          )}

          {editable ? (
            <TextInput
              style={styles.input}
              onChangeText={setUpdatedDescription}
              value={updatedDescription}
            />
          ) : (
            <Text style={styles.modalText}>{description}</Text>
          )}

          <Text style={styles.modalText}>{updatedAt}</Text>
          <Text style={styles.modalText}>{createdAt}</Text>
          <TouchableOpacity
            style={editable ? styles.saveButton : styles.editButton}
            onPress={handleSave}
          >
            <Ionicons
              name={editable ? "save-outline" : "create-outline"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.button, styles.buttonLeft]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="create-outline" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.button, styles.buttonRight]}
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
  modalView: {
    flex: 1,
    padding: 12,
  },
  modalText: {
    marginBottom: 15,
  },
  rowBack: {
    backgroundColor: "#DDD",
    height: "100%",
  },
  buttonLeft: {
    backgroundColor: "orange",
    right: 75,
  },
  buttonRight: {
    backgroundColor: "green",
    right: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    width: 75,
  },
  editButton: {
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
