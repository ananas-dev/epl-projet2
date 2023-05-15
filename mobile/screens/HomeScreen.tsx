import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import {
  useMetalDetectorStore,
} from "../stores/MetalDetectorStore";
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


const HomeScreen = ({ navigation }) => {
  const connect = useMetalDetectorStore((state) => state.connect);
  const connected = useMetalDetectorStore((state) => state.connected);

  useEffect(() => {
    connect();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleRowContainer}>
          <Text style={styles.titleText}>QU</Text>
          <Text style={[styles.titleText, styles.titleTextHighlight]}>WEE</Text>
          <Text style={styles.titleText}>DITCH  </Text>
          <FontAwesome5 name="quidditch" size={32} color="black"/>
        </View>
        <Text style={styles.groupName}>11.81</Text>
      </View>
      <Pressable
        style={[styles.playBtn, !connected && styles.playBtnDisabled ]}
        disabled={!connected}
        onPress={() => navigation.navigate("Play")}
        android_ripple={{
          color: "#759ec4",
          radius: 50,
        }}
      >
        <FontAwesome name="play" size={40} color="white" style={styles.playIcon}/>
      </Pressable>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            connected ? styles.green : styles.red,
          ]}
        />
        <Text style={styles.statusText}>
          {connected
            ? "Connected"
            : "Disconnected"}
        </Text>
      </View>
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
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
  },
  titleRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "700"
  },
  titleTextHighlight: {
    color: "#4e8bc4"
  },
  groupName: {
    fontSize: 20,
    fontWeight: "600",
  },
  playBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: "#4e8bc4",
  },
  playBtnDisabled: {
    elevation: 0,
    backgroundColor: "#024e93",
  },
  playIcon: {
    marginLeft: 5,
    elevation: 4,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: 10,
    bottom: 10,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 1,
    borderWidth: 1,
    borderColor: "#eeeeee",
  },
  statusDot: {
    marginRight: 10,
    height: 12,
    width: 12,
    borderRadius: 50,
    elevation: 2,
  },
  statusText: {
    fontWeight: "500",
  },
  green: {
    backgroundColor: "#28a745",
  },
  red: {
    backgroundColor: "#dc3545",
  },
});

export default HomeScreen;
