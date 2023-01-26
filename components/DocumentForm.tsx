import { ReactElement, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation } from "@apollo/client";

import { DOCUMENTS_MUTATION, DOCUMENTS_QUERY } from "../gql/Queries";

type Props = {
  id: string | undefined;
  title: string;
  description: string;
  setEditable: (arg: boolean) => void;
};

export default function DocumentForm(props: Props): ReactElement {
  const { id, title, description, setEditable } = props;

  const [updatedTitle, setUpdatedTitle] = useState<string | undefined>();
  const [updatedDescription, setUpdatedDescription] = useState<
    string | undefined
  >();

  const [documentMutation, { data, loading, error }] = useMutation(
    DOCUMENTS_MUTATION,
    {
      refetchQueries: [{ query: DOCUMENTS_QUERY }],
    }
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (error) {
    return (
      <View>
        <Text>Network error, try again later !</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  function handleSave(): void {
    documentMutation({
      variables: { id, title: updatedTitle, description: updatedDescription },
    });
    setEditable(false);
  }

  return (
    <>
      <TextInput
        style={styles.input}
        onChangeText={setUpdatedTitle}
        value={updatedTitle}
        defaultValue={title}
      />
      <TextInput
        style={styles.input}
        onChangeText={setUpdatedDescription}
        value={updatedDescription}
        defaultValue={description}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Ionicons name={"save-outline"} size={32} color="white" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveButton: {
    backgroundColor: "#1ee156",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
