import { ParallaxCorousel } from "@/components/blur-parallax";
import { NonTriggerData } from "@/constants";
import { useThemeColors } from "@/constants/Colors";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function SinglePage(){
    const {background, text} = useThemeColors();
    const {id: title} = useLocalSearchParams();
    const {singles: singlesInfo} = NonTriggerData;

    return (
        <View style={[styles.container, {backgroundColor: background, overflow: 'hidden'}]} >
            <Background image={singlesInfo.image} />
            <BlurView intensity={80} style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></BlurView>
            <View style={{position: 'absolute', height: '100%', width: '100%' }}>
                <ParallaxCorousel data={[singlesInfo.image]} title={title as string}  />
            </View>
        </View>
    )
}


const Background = ({image}: {image: any})=>{
    return (
        <ImageBackground 
            contentFit='cover' 
            transition={{timing:'linear',duration:200}} 
            cachePolicy={'memory-disk'} style={styles.imageBackground} 
            source={image||{uri: 'null'}} 
            imageStyle={{
                transform: [{scale: 1.8}]
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
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
    imageItem:{
        marginRight: 5,
        marginBottom: 5,
    },
    imageBackground: {
        // position: 'absolute',
        flex: 1,
        width: "100%",
        height: "100%",
    }

})