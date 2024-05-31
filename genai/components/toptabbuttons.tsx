import { useTheme } from "@/constants/Theme";
import { StyleSheet, View } from "react-native";
import { currentActiveTab, scrollable, tabButtons, useDynamicMemoStyles } from "./global";
import { useState } from "react";
import { ScrollView, GestureHandlerRootView, FlatList, Swipeable } from "react-native-gesture-handler";
import { Button } from "./button";


export const ButtonTabs = ()=>{
    const { white } = useTheme().colors;
    const [currentTab,setCurrentTab] = useState(tabButtons[0]);
    const dynamicStyles = useDynamicMemoStyles(()=>{
  
      return {
        buttonTabs: {
            backgroundColor: white,
        }
      }
    },[white])
    return (
     <View style={dynamicStyles.buttonTabs}>
         <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.buttonTabs} >
          {tabButtons.map(({name},index)=> <Button key={name} active={name===currentTab.name} onPress={()=>{
            if(currentActiveTab.name===name){
              return;
            }
            setCurrentTab(tabButtons[index]);
            scrollable.scrollToIndex&&scrollable.scrollToIndex(index+1,{animate:true});
  
          }} title={name} style={styles.buttons} />)}
        </ScrollView>
     </View>
    )
  }
  
  const styles = StyleSheet.create({
   
    buttonTabs:{
      paddingTop: 5,
      paddingBottom: 7,
      paddingLeft: 10,
    },
    buttons:{
      marginRight: 10
    }
  
  });
  