import {
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import {
  MetalDetectorStatus,
  useMetalDetectorStore,
} from "../stores/MetalDetectorStore";

const HomeScreen = ({ navigation }) => {
  const connect = useMetalDetectorStore((state) => state.connect);
  const status = useMetalDetectorStore((state) => state.status);

  useEffect(() => {
    switch (status) {
      case MetalDetectorStatus.Connected:
        navigation.navigate("Play");
        break;
      case MetalDetectorStatus.Error:
        ToastAndroid.show("Failed to connect !", ToastAndroid.SHORT);
        break;
    }
  }, [status]);

  const onPressConnect = () => {
    connect();
  };

  return (
    <View style={styles.container}>
      <Button title="Connect" onPress={onPressConnect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
