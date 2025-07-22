import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [time, setTime] = useState<number>(30);
  const [timerId, setTimerId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (time === 0 && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [time]);

  const startTimer = () => {
    if (timerId || time === 0) return; // Prevent multiple timers or starting when over
    const id = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    setTimerId(id);
  };

  const resetTimer = () => {
    if (timerId) clearInterval(timerId);
    setTimerId(null);
    setTime(30);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          {time > 0 ? time : 'Time is over'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.startButton]} onPress={startTimer}>
          <Text style={styles.buttonText}>Start Timer</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.resetButton]} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset Timer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    backgroundColor: '#f5f5f5',
  },
  timerContainer: {
    backgroundColor: '#ffe4e1',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    elevation: 5,
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    elevation: 3,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
