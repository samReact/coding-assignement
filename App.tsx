import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Documents from "./components/Documents";
import Header from "./components/Header";

const GRAPHQL_URI = "https://app.st-basquiat.co/graphql/";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.content}>
        <Header />
        <View style={styles.container}>
          <Documents />
        </View>
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: "space-between" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
});
