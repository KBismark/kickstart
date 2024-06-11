import { Image as ExpoImage } from "expo-image";
import { useMemo } from "react";
import { StyleProp, ImageStyle, StyleSheet } from "react-native";
import { Image } from "react-native-animatable";

type Props = {
    uri:string;
    style?:StyleProp<ImageStyle>;
     /** Set to a newly created object to cause update in styles to apply */
     styleChanged?:{};
}
let count = 0;
export function ImageView({uri,style,styleChanged}:Props){
    // console.log(uri);
    
    const build = useMemo(()=>({
        style: [styles.image,style],
        transition: {timing:'linear',duration:200}
    }),[styleChanged]);
    let img: any;
    if(count<1){
      count = 1
      img = require('../assets/images/laptop.png')
    }else{
      count = 0;
      img = require('../assets/images/lab.png')
    }
    // const source = useRef<ImageURISource>({
    //   uri: uri
    // },).current;
    // <Image contentFit='cover' transition={build.transition as any} cachePolicy={'memory-disk'} style={build.style} source={uri} />
    // {'uri':uri}
    return (
        <ExpoImage contentFit='cover' transition={build.transition as any} cachePolicy={'memory-disk'} style={build.style} source={{uri: uri||'null'}} />
    )
  }


   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 0,
      overflow: "hidden"
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        objectFit:'cover'
    }
  });