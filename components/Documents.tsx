import { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigate } from "react-router-native";

import { DOCUMENTS_QUERY } from "../gql/Queries";
import { I18nContext } from "../App";

export type Elements = {
  id: string;
  title: string;
  updatedAt: string;
};

type DocumentsQuery = {
  findDemoDocuments: {
    elements: Elements;
  };
};

export default function Documents() {
  const {
    data,
    loading,
    error,
  }: QueryResult<DocumentsQuery, OperationVariables> =
    useQuery(DOCUMENTS_QUERY);

  const i18n = useContext(I18nContext);

  const navigate = useNavigate();

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

  return (
    <>
      <Text style={styles.title}>{i18n.t("documents")}</Text>
      <SwipeListView
        data={data?.findDemoDocuments.elements}
        renderItem={(data) => {
          const updatedDate = new Date(data.item.updatedAt).toLocaleDateString(
            "fr-CH"
          );
          return (
            <View style={styles.rowFront}>
              <Text style={styles.textStyle}>{data.item.title}</Text>
              <Text style={styles.date}>
                {i18n.t("updated")} {updatedDate}
              </Text>
            </View>
          );
        }}
        renderHiddenItem={(data) => {
          return (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[styles.button, styles.buttonLeft]}
                onPress={() =>
                  navigate(`/${data.item.id}`, { state: { editable: true } })
                }
              >
                <Ionicons name="create-outline" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate(`/${data.item.id}`, { state: { editable: false } })
                }
                style={[styles.button, styles.buttonRight]}
              >
                <Ionicons name="eye-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
        disableRightSwipe
        rightOpenValue={-150}
        keyExtractor={(data: Elements) => data.id.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 18,
    fontWeight: "bold",
  },
  rowFront: {
    height: 65,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderColor: "#81b0ff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  rowBack: {
    backgroundColor: "#DDD",
    height: 65,
    borderRadius: 10,
  },
  buttonLeft: {
    backgroundColor: "#81b0ff",
    right: 75,
  },
  buttonRight: {
    backgroundColor: "#1ee156",
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    top: 0,
    width: 75,
  },
  date: {
    fontStyle: "italic",
    opacity: 0.5,
  },
});
