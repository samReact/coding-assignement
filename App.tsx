import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Documents from "./components/Documents";


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://app.st-basquiat.co/graphql/',
  cache: new InMemoryCache()
});

export default function App() {
  return (
  
  <ApolloProvider client={client}>
    <View style={styles.container}>
      <Documents/>
      <StatusBar style="auto" />
    </View>
  </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12
  },
});
