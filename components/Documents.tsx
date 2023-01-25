import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { OperationVariables, QueryResult, useQuery } from "@apollo/client";
import { SwipeListView } from "react-native-swipe-list-view";

import DocumentModal from "./DocumentModal";
import { DOCUMENTS_QUERY } from "../gql/Queries";

type Elements = {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
};

type DocumentsQuery = {
  findDemoDocuments: {
    elements: Elements;
  };
};

export default function Documents() {
  const { data, loading }: QueryResult<DocumentsQuery, OperationVariables> =
    useQuery(DOCUMENTS_QUERY);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.content}>
      <SwipeListView
        data={data?.findDemoDocuments.elements}
        renderItem={(data) => (
          <View style={styles.item}>
            <Text style={styles.textStyle}>{data.item.title}</Text>
          </View>
        )}
        renderHiddenItem={(data) => {
          return <DocumentModal document={data.item} />;
        }}
        disableRightSwipe
        rightOpenValue={-150}
        keyExtractor={(data: Elements) => data.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  item: {
    height: 65,
    backgroundColor: "#f9c2ff",
    marginBottom: 10,
  },
  textStyle: {
    fontWeight: "bold",
  },
});
