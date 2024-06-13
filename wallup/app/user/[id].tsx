import { ParallaxCorousel } from "@/components/blur-parallax";
import { NonTriggerData } from "@/constants";
import { useThemeColors } from "@/constants/Colors";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function UserPage(){
    const {background, text} = useThemeColors();
    const {id: username} = useLocalSearchParams();
    const dispatch = useAppDispatch();
    
    

    let {data} = useSelector<RootStateStore, RootStateStore['posts']['value']['']>(({posts})=>posts.value[username as string]);

    const {user: userInfo} = NonTriggerData;
    data = [data[userInfo.current.index], ...data.slice(userInfo.current.index+1), ...data.slice(0, userInfo.current.index)];

    return (
        <View style={[styles.container, {backgroundColor: background, overflow: 'hidden'}]} >
            <Background />
            <BlurView intensity={80} style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></BlurView>
            <View style={{position: 'absolute', height: '100%', width: '100%' }}>
                <ParallaxCorousel data={data.map((item)=>item.image)} title={username as string}  />
            </View>
        </View>
    )
}


const Background = ()=>{
    // const 
    const image = 
    // require('../../assets/images/image1.jpeg');
    useSelector<RootStateStore,RootStateStore['currentItem']['value']['image']>(({currentItem, posts})=>{
        // const {username} = currentItem.value;
        // const postData = posts[username];
        return currentItem.value.image;
    });
    // console.log(image, 76);
    
    //require('../../assets/images/image1.jpeg');
    const uri = '';

    return (
        <ImageBackground 
            contentFit='cover' 
            transition={{timing:'linear',duration:200}} 
            cachePolicy={'memory-disk'} style={styles.imageBackground} 
            source={image||{uri: uri||'null'}} 
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