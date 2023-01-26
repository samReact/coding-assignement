import { ReactElement, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryResult, useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-native";

import DocumentForm from "./DocumentForm";
import { I18nContext } from "../App";
import { DOCUMENT_QUERY } from "../gql/Queries";
import { Elements } from "./Documents";

type DocumentQuery = {
  getDemoDocument: Elements;
};

export default function Document(): ReactElement {
  const { id } = useParams();
  const { state } = useLocation();

  const i18n = useContext(I18nContext);

  const {
    data,
    loading,
    error,
  }: QueryResult<DocumentQuery, { id: string | undefined }> = useQuery(
    DOCUMENT_QUERY,
    {
      variables: { id },
    }
  );

  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    if (state.editable) {
      setEditable(true);
    }
  }, [state]);

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
  const { title, description, updatedAt, createdAt } = data?.getDemoDocument!;

  function handleSave(): void {
    if (!editable) {
      return setEditable(true);
    }
  }
  const updatedDate = new Date(updatedAt).toLocaleDateString("fr-CH");
  const createdDate = new Date(createdAt).toLocaleDateString("fr-CH");

  return (
    <View style={styles.container}>
      {editable ? (
        <DocumentForm
          id={id}
          title={title}
          description={description}
          setEditable={setEditable}
        />
      ) : (
        <>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {i18n.t("created")} {createdDate}
            </Text>
            <Text style={styles.date}>
              {i18n.t("updated")} {updatedDate}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditable(true)}
          >
            <Ionicons name={"create-outline"} size={32} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  description: {
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.5,
  },
  date: {
    fontStyle: "italic",
  },
  editButton: {
    backgroundColor: "#81b0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
