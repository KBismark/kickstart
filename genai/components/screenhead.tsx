import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, useDynamicMemoStyles } from "./global";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/constants/Theme";

type Props = {
    title: string
}
export const ScreenHeader = ({title}: Props)=>{
    const { white, black } = useTheme().colors;
    const dynamicStyles = useDynamicMemoStyles(()=>{
  
      return {
        container: {
          backgroundColor: white,
          paddingHorizontal: 15,
          paddingRight: 20,
          alignItems: 'center',
  
        }
      }
    },[white])
    return (
      <View style={dynamicStyles.container}>
        <SafeAreaView style={styles.greeting}>
            <Pressable style={styles.header}>
                <Feather size={26} color={black} name='chevron-left' style={styles.backIcon} />
                <Heading type='h3'>{title}</Heading>
            </Pressable>
            <Pressable onPress={undefined} >
                <Feather size={26} color={black} name='settings' />
            </Pressable>
        </SafeAreaView>
      </View>
    )
  }


  const styles = StyleSheet.create({
    greeting:{
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon:{
        marginRight: 5
    }
  })