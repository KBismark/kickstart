import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading, useDynamicMemoStyles } from "./global";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/constants/Theme";
import { router } from "expo-router";

type Props = {
    title: string;
    onMenu?: ()=>void;
}
export const ScreenHeader = ({title, onMenu}: Props)=>{
    const { white, black,neutral, fadedBlack } = useTheme().colors;
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
            <Pressable onPress={()=>{
              if(router.canGoBack()){
                router.back();
              }else{
                router.push('/')
              }
            }} style={styles.header}>
                <Feather size={26} color={black} name='chevron-left' style={styles.backIcon} />
                <Heading type='h3'>{title}</Heading>
            </Pressable>
            <Pressable style={{backgroundColor: neutral, borderRadius: 50,width: 35,height: 35,flexDirection: 'row',justifyContent:'center', alignItems: 'center'}} onPress={onMenu} >
                <Feather size={26} color={fadedBlack} name='menu' />
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