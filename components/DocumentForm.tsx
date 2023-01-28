import { ReactElement, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useMutation } from "@apollo/client";

import { DOCUMENTS_MUTATION, DOCUMENTS_QUERY } from "../gql/Queries";
import Button from "./Button";
import { I18nContext } from "../App";
import colorsConstants from "../constants/colors.constants";

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

  const i18n = useContext(I18nContext);

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
      <View>
        <View>
          <Text style={styles.label}>{i18n.t("title")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUpdatedTitle}
            value={updatedTitle}
            defaultValue={title}
            placeholder={i18n.t("title")}
          />
        </View>
        <View>
          <Text style={styles.label}>{i18n.t("description")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUpdatedDescription}
            value={updatedDescription}
            defaultValue={description}
            placeholder={i18n.t("description")}
          />
        </View>
      </View>
      <Button
        onPress={handleSave}
        backgroundColor={colorsConstants.secondary}
        iconColor="white"
        iconName="save-outline"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    marginBottom: 12,
    borderWidth: 1,
    padding: 8,
  },
  label: {
    fontWeight: "bold",
  },
});
