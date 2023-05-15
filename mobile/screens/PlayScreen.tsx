import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import {
  MetalDetectorStatus,
  useMetalDetectorStore,
} from "../stores/MetalDetectorStore";
import { Audio } from "expo-av";

const PlayScreen = ({ navigation }) => {
  const [score, setScore] = useState<number>(0);
  const [scoreSound, setScoreSound] = useState<Audio.Sound>();
  const detecting = useMetalDetectorStore((state) => state.detecting);
  const connected = useMetalDetectorStore((state) => state.connected);

  useEffect(() => {
    if (!connected) {
      ToastAndroid.show("Disconnected !", ToastAndroid.SHORT);
      navigation.navigate("Home");
    }
  }, [connected]);

  const playScoreSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/score.mp3")
    );
    setScoreSound(scoreSound);

    await sound.playAsync();
  };

  useEffect(() => {
    return scoreSound
      ? () => {
          scoreSound.unloadAsync();
        }
      : undefined;
  }, [scoreSound]);

  useEffect(() => {
    if (detecting) {
      setScore(score + 1);
      playScoreSound();
    }
  }, [detecting]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.scoreText}>Score: {score}</Text>
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
  scoreContainer: {
    borderRadius: 22,
  },
  scoreText: {
    fontSize: 32
  }
});

export default PlayScreen;
