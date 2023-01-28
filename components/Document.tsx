import { ReactElement, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { QueryResult, useQuery } from "@apollo/client";
import { useLocation, useParams } from "react-router-native";

import DocumentForm from "./DocumentForm";
import { I18nContext } from "../App";
import { DOCUMENT_QUERY } from "../gql/Queries";
import colorsConstants from "../constants/colors.constants";

import Button from "./Button";

export type Elements = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

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
    return <ActivityIndicator size="large" color={colorsConstants.primary} />;
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
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                {i18n.t("created")} {createdDate}
              </Text>
              <Text style={styles.date}>
                {i18n.t("updated")} {updatedDate}
              </Text>
            </View>
            <Button
              onPress={() => setEditable(true)}
              backgroundColor={colorsConstants.warning}
              iconColor="white"
              iconName="create-outline"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    marginBottom: 15,
  },
  dateContainer: {
    opacity: 0.5,
    marginBottom: 16,
  },
  date: {
    fontStyle: "italic",
  },
});
