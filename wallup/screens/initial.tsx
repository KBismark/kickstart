import { CategoryItem } from "@/components/topcategory";
import { useThemeColors } from "@/constants/Colors";
import { CatItems } from "@/constants/data";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from 'react-native-animatable'
import { ScreenHeight } from "@/constants";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

const animations = {
    init: {
        from: {
            transform: [
                {translateY: ScreenHeight*0.5},
                {scale: 1.5}
            ]
        },
        to: {
            transform: [
                { translateY: 0 },
                {scale: 1}
            ]
        }
    },
    container: {
        from: {
            transform: [
                {scale: 1.9}
            ]
        },
        to: {
            transform: [
                {scale: 1}
            ]
        }
    }
}
export const IntitialScreen = ({onDone}: {onDone: ()=>void})=>{
    const {background, text} = useThemeColors();
    const data = Object.keys(CatItems).map((categoryName)=>{
        return {image: CatItems[categoryName], name: categoryName}
    });

    return (
        <View style={{backgroundColor: background, flex: 1, }}>
            <SafeAreaView style={{flex:1}}>
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ }}>
                    <Text style={{color: text, fontWeight: 'bold', fontSize: 22, marginBottom: 25,marginTop: 20, paddingHorizontal: 15}}>Select your top 6 categories</Text>
                    <Animatable.View 
                        delay={500}
                        duration={300}
                        animation={animations.container }
                        style={{
                            flexDirection: 'row', flexWrap: 'wrap',
                             justifyContent: 'space-between', 
                             paddingBottom: '30%', paddingHorizontal: 5,
                             transform: [{scale: 1}]
                        }}
                    >
                        {
                            [...data,...data,...data,...data].map((item,index)=>{
                                return (
                                    <TouchableOpacity key={item.name+index}>
                                        <Animatable.View 
                                            // style={{
                                            //     transform: [{translateY: ScreenHeight*0.5}, {scale: 1.3}]
                                            // }} 
                                            // delay={150} duration={400} 
                                            // animation={animations.init as any}
                                        >
                                            <CategoryItem {...item} inColumns={true}  />
                                        </Animatable.View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </Animatable.View>
                </ScrollView>
                <Animatable.View duration={200} delay={900} style={{opacity: 0}} animation={{from: {opacity: 0}, to: {opacity: 1}}} >
                    <BlurView intensity={70} style={styles.saveContainerInit}>
                        <TouchableOpacity onPress={onDone} style={styles.saveButton}>
                            <BlurView style={[styles.saveButtonBlur, {width: '100%', height: 60}]} intensity={60} >
                                <Text style={{color: text, fontWeight: 'bold', fontSize: 18, marginRight: 10}}>Explore</Text>
                                <Feather name='arrow-right' size={28} color={text} style={{marginTop: -3}} />
                            </BlurView>
                        </TouchableOpacity>
                    </BlurView>
                </Animatable.View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 10,

    },
    textBold: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        // marginBottom: 15,
    },
    saveButtonBlur: { 
        borderRadius: 15, width: 40, height: 40, 
        alignItems: 'center',justifyContent: 'center', 
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255, 0.2)' 
    },
    saveButton: {
        overflow: 'hidden', borderRadius: 100, 
        alignItems: 'center',justifyContent: 'center',
        width: '80%',
    },
    image: { width: '100%', height: '100%' },
    saveContainerInit: {
      alignItems: 'center', flexDirection: 'row', 
      justifyContent: 'center', 
      position: 'absolute', 
      width: '100%',
      bottom: 0, 
      paddingBottom: 40,
      paddingTop: 15, 
      backgroundColor: 'rgba(0,0,0,0.3)'
    }
})

