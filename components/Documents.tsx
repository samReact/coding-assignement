import { StyleSheet,FlatList, Text } from 'react-native';
import { useQuery } from "@apollo/client";
import { DOCUMENTS_QUERY } from "../gql/Queries";
import DocumentModal from "./DocumentModal";



export default function Documents() {
  const { data, loading } = useQuery(DOCUMENTS_QUERY); 

  if (loading) {
    return <Text>Fetching data...</Text> 
  }

  return (
      <FlatList
        data={data.findDemoDocuments.elements}
        renderItem={({ item }) => <DocumentModal document={item} />}
        keyExtractor={item => item.id}
      />
  );
}

const styles = StyleSheet.create({
 
});
