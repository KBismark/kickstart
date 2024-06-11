import { useTheme } from "@/constants/Theme"
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native"
import { Heading, ScreenHeight, Text, currentActiveTab, itemPaged, mainScreen, overlayControl, tabScreenScrollPositions, useDynamicMemoStyles } from "./global";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import React, { useRef, useState } from "react";
import { ImageView } from "./image";

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

const Articles = React.memo(({imageSrc, title, caption, onSave, onView }: ArticleProps)=>{
    const {white, searchBar, fadedBlack, neutral} = useTheme().colors;
    const [pressed,setPressed] = useState(false);
    const [pagingAnimationEnd,setPagingAnimation] = useState({
        pageY:0,
        ended:false
    });
    const [position,setPosition] = useState<{x:number,y:number,width:number,height:number,pageX:number,pageY:number}>({
        x:0,y:0,width:0,height:0,pageX:0,pageY:0,
    });
    const ref = useRef<View>(null);
    
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
        <>
            <Animatable.View 
                onAnimationEnd={()=>{
                    setTimeout(() => {
                        ref.current&&ref.current.measure&&ref.current.measure((x,y,width,height,pageX,pageY)=>{
                            const tabName = currentActiveTab.name;
                            const currentTabScrollPosition = tabScreenScrollPositions[tabName].positionY;
                            const mainScreenScrollposition = mainScreen.positionY;
                            // console.log('Animation end:  ',{x,y,width,height,pageX,pageY,currentTabScrollPosition,ScreenHeight, mainScreenScrollposition});
                            // if(pressed){
                            //     setPagingAnimation({
                            //         ended: true,
                            //         pageY
                            //     })
                            // }
                        })
                    }, 50);
                }}
                style={
                    pagingAnimationEnd.ended?[
                        {
                            paddingTop: 10,
                        },
                        {
                            // paddingTop: 10,
                            elevation: 16,
                            shadowColor: '#000000',
                            shadowOpacity: 0.217,
                            shadowOffset: {
                                height: -10,
                                width: 0
                            },
                            shadowRadius: 8,
                            
                            
                            // top: 0, right: 0,
                            // left: 0,bottom: 0,
                            zIndex: 3,
                            height: ScreenHeight*2,
                            backgroundColor: white,
                            transform: [
                                {
                                    // scaleX: 0.95,
                                    translateY: -(position.pageY )
                                }
                            ]
                        }
                    ]
                    : 
                    {
                        paddingTop: 10,
                    }
                } 
                duration={!pressed||pagingAnimationEnd.ended?undefined:500}

                animation={!pressed||pagingAnimationEnd.ended?undefined: {
                    from: {
                        // paddingTop: 10,
                        elevation: 0,
                        shadowColor: 'rgba(0,0,0,0)',
                        shadowOpacity: 0,
                        shadowOffset: {
                            height: 0,
                            width: 0
                        },
                        shadowRadius: 0,

                        zIndex: 0,
                        height: position.height,
                        backgroundColor: 'rgba(0,0,0,0)',
                        // top: 0, right: 0,
                        // left: 0,bottom: 0,
                        transform: [
                            {
                                // scaleX: 1,
                                translateY: 0
                            }
                        ]
                    },
                    to:{
                        // paddingTop: 10,
                        elevation: 16,
                        shadowColor: '#000000',
                        shadowOpacity: 0.217,
                        shadowOffset: {
                            height: -10,
                            width: 0
                        },
                        shadowRadius: 8,
                        
                        
                        // top: 0, right: 0,
                        // left: 0,bottom: 0,
                        zIndex: 3,
                        height: ScreenHeight*2,
                        backgroundColor: white,
                        transform: [
                            {
                                // scaleX: 0.95,
                                translateY: -(position.pageY)
                            }
                        ]
                    }
                }
                
            }>
                <Pressable 
                    ref={ref}
                    // onLayout={(e)=>{
                    //     console.log(e.nativeEvent.layout);
                        
                    // }} 
                    onPress={()=>{
                        if(ref.current){
                            // console.log(ref.current.measure);
                            
                            ref.current.measure&&ref.current.measure((x,y,width,height,pageX,pageY)=>{
                                
                                const tabName = currentActiveTab.name;
                                
                               
                                if(!pressed){
                                    // pageY+=150
                                    
                                    mainScreen.scrollTo&&mainScreen.scrollTo(130);

                                }else{
                                    setPagingAnimation({
                                        ended: false,
                                        pageY: 0
                                    })
                                }
                                    const currentTabScrollPosition = tabScreenScrollPositions[tabName].positionY;
                                    const mainScreenScrollposition = mainScreen.positionY;
                                    // tabScreenScrollPositions[tabName].setScreenScrollPosition(pageY+currentTabScrollPosition,true)
                                    console.log({x,y,width,height,pageX,pageY,currentTabScrollPosition,ScreenHeight, mainScreenScrollposition});


                                    itemPaged.onTabOnly[tabName]&& itemPaged.onTabOnly[tabName](!pressed);
                                    const callbacks = itemPaged.onPage;
                                    for(let key in callbacks){
                                        callbacks[key]&&callbacks[key](!pressed);
                                    }
                                    setPressed(!pressed);
                                    // if(pageY<0){
                                    //     pageY = 0;
                                    // }
                                    // pageY-=mainScreen.positionY;
                                    pageY=pageY - (mainScreenScrollposition>120?100:194);
                                    
                                    setPosition({x,y,width,height,pageX,pageY:pageY});
                                
                                // overlayControl.show(!pressed)
                            })
                        }else{
                            console.log('none');
                            
                        }
                    
                    }}>
                    <View style = {dynamicStyles.articleContainer} >
                        <View style={dynamicStyles.imageSpace}>
                            <ActivityIndicator size='small' />
                            <ImageView uri={imageSrc} />
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
                    </View>
                </Pressable>
            
            </Animatable.View>
            {/* {pressed&&} */}
        </>
    )
})
export const Article =Articles;


const ImageContent = ()=>{
    const uri =  'https://placekitten.com/564/667' //'https://placekitten.com/500/500'
    return <ImageView uri={uri} />
}

type PImageProps = {
    width?:number;
    height?:number
}
export const ProfileImage = ({width,height}: PImageProps)=>{
    const {white, searchBar, fadedBlack, neutral} = useTheme().colors;
    const dynamicStyles = useDynamicMemoStyles(()=>{
        return {
           
            articleAuthorProfile: [
                styles.articleAuthorProfile,
                {
                    backgroundColor: searchBar,
                },
                (width?{width}:{}),
                (height?{height}:{})
            ]
        }
    },[width,height])
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
        paddingTop: 10,
        // marginTop: 5,


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
        marginRight: 7,
        overflow: 'hidden'
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