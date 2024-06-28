import { Conversations } from '@/components/chatrows';
import { StatusHead } from '@/components/status';
import { useTheme } from '@/constants/Theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Home() {
  const {white, background} = useTheme().colors
  return (
  <GestureHandlerRootView style={styles.container}>
       
        <SafeAreaView style={[styles.container, {backgroundColor: white}]}>
          <Conversations />
        </SafeAreaView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
