import { createContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NativeRouter, Route, Routes } from "react-router-native";
import { API_URL, API_TOKEN } from "@env";
import { I18n } from "i18n-js";

import Documents from "./components/Documents";
import Header from "./components/Header";
import Document from "./components/Document";

import en from "./translations/en.json";
import fr from "./translations/fr.json";

const i18n = new I18n({
  ...en,
  ...fr,
});

// Initialize Apollo Client
const client = new ApolloClient({
  uri: API_URL,
  headers: {
    Authorization: API_TOKEN,
  },
  cache: new InMemoryCache(),
});
export const I18nContext = createContext(i18n);

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  if (isEnabled) {
    i18n.locale = "en";
  } else {
    i18n.locale = "fr";
  }

  return (
    <ApolloProvider client={client}>
      <I18nContext.Provider value={i18n}>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.content}>
          <NativeRouter>
            <Header toggleSwitch={toggleSwitch} isEnabled={isEnabled} />

            <View style={styles.container}>
              <Routes>
                <Route path="/" element={<Documents />} />
                <Route path="/:id" element={<Document />} />
              </Routes>
            </View>
          </NativeRouter>
        </SafeAreaView>
      </I18nContext.Provider>
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
