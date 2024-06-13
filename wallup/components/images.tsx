import { useThemeColors } from "@/constants/Colors";
import { Image, ImageStyle } from "expo-image";
import { ActivityIndicator, StyleProp, StyleSheet, View } from "react-native";

type ImageSpaceProps= {
    width: number;
    height: number;
    radius?: number;
    loader?: boolean;
    image?: any;
    uri?: string;
    imgStyle?: StyleProp<ImageStyle>;
    style?: StyleProp<ImageStyle>;
}
export const ImageSpace = ({width, height, radius, loader, uri, image, imgStyle, style}: ImageSpaceProps)=>{
    const {text, background, gray0, gray1, gray2} = useThemeColors()
    return (
        <View style={[styles.imageSpace, {
            width,
            height,
            borderRadius: radius,
            backgroundColor: gray1,
        }, style]}>
            {loader&&<ActivityIndicator size='small' />}
            <Image 
                contentFit='cover' 
                transition={{timing:'linear',duration: 400}} 
                cachePolicy={'memory-disk'} style={[styles.image, imgStyle]} 
                source={image||{uri: uri||'null'}} 
            />
        </View>
    )
}













const styles = StyleSheet.create({
    isContainer: {

    },
    image: {
        position: 'absolute',
        // flex: 1,
        width: "100%",
        height: "100%",
    },
    imageSpace:{
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
