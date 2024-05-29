import { useTheme } from "@/constants/Theme"
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native"
import { Heading, Text, useDynamicMemoStyles } from "./global";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type ArticleProps = {
    imageSrc: string;
    title: string;
    caption: string;
    onView?: ()=>void;
    onSave?: ()=>void;
}
const gradientColors = ['rgba(255,255,255,0)','rgba(255,255,255,1)','rgba(255,255,255,1)'];
const gradientStops = {
    start: {x:0,y: 0.1},
    end: { x: 0, y: 1 }
}
export const Article = ({imageSrc, title, caption, onSave, onView }: ArticleProps)=>{
    const {white, searchBar, fadedBlack, neutral} = useTheme().colors;
    const dynamicStyles = useDynamicMemoStyles(()=>{
        return {
            container: {
                backgroundColor: neutral
            },
            articleContainer: [
                styles.articleContainer,
                {
                    backgroundColor: white,
                    borderBottomColor: neutral,
                    borderBottomWidth: 1

                }
            ],
            imageSpace: [
                styles.imageSpace,
                {
                    backgroundColor: searchBar
                }
            ],
            articleAuthorProfile: [
                styles.articleAuthorProfile,
                {
                    backgroundColor: searchBar
                }
            ]
        }
    },[])
    return (
        <View style={dynamicStyles.container}>
            <Pressable onPress={onView} style={dynamicStyles.articleContainer} >
                <View style={dynamicStyles.imageSpace}>
                    <ActivityIndicator size='small' />
                    <ImageContent />
                </View>
                <LinearGradient style={styles.gradient}  start={gradientStops.start} end={gradientStops.end} colors={gradientColors}>
                    <View style={styles.summarry}>
                        <Heading style={styles.articleHeading} type='h5'>{title}</Heading>
                        <Text type='normal'>{caption}...</Text>
                    </View>
                </LinearGradient>
                
                <View style={styles.articleBottom} >
                    <Pressable style={styles.articleAuthor} >
                        <View style={dynamicStyles.articleAuthorProfile} >
                            <ImageContent />
                        </View>
                        <Heading type='h5'>{'AI Generated'}</Heading>
                    </Pressable>
                    <Pressable onPress={onSave} >
                        <Feather size={26} color={fadedBlack} name='bookmark' />
                    </Pressable>
                </View>
            </Pressable>
        </View>
    )
}


const ImageContent = ()=>{

    return null
}

export const ProfileImage = ()=>{
    const {white, searchBar, fadedBlack, neutral} = useTheme().colors;
    const dynamicStyles = useDynamicMemoStyles(()=>{
        return {
           
            articleAuthorProfile: [
                styles.articleAuthorProfile,
                {
                    backgroundColor: searchBar
                }
            ]
        }
    },[])
    return (
        <View style={dynamicStyles.articleAuthorProfile} >
            <ImageContent />
        </View>
    )
}


const styles = StyleSheet.create({
    articleContainer:{
        width: '100%',
        padding: 10,
        marginTop: 10,


    },
    articleHeading: {
        marginBottom: 4
    },
    gradient:{
        marginTop: -90
    },
    summarry:{
        marginTop: 70,
        // backgroundColor: 'white'
    },
    articleBottom:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    articleAuthor:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    // articleAuthorName:{
    //     marginLeft: 7
    // },
    articleAuthorProfile:{
        width: 40,
        height: 40,
        borderRadius: 45,
        marginRight: 7
    },
    imageSpace:{
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        width: '100%',
        height: 250,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        position: 'absolute',
        width: '100%'
    }
})