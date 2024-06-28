import { ContextId, createComponent, useStateStore } from "statestorejs";
import * as Animatable from 'react-native-animatable';
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import { SVGProps, memo, useMemo, useState } from "react";
import { Text, useTheme } from "@/constants/Theme";
import { SCREEN_WIDTH } from "@/constants/Screen";

export const ProfileHeadSize = 65;
const horizontalMargin = 8;
export const ProfileHeadSizeWithMargin = ProfileHeadSize+ (2*horizontalMargin);

export const StatusHead = memo(({propsSource, size, load}: {propsSource: string|ContextId; size?: number; load?:boolean})=>{
    const [loaded, setLoad] = useState(!load);
    const {neutral, gray1} = useTheme().colors;
    if(!loaded) return <StatusHeadLoading propsSource='' />
    return (
        <Pressable style={[styles.round, {backgroundColor: gray1}, (size?{width: size, height: size}:undefined) ]}>

        </Pressable>
    )
})

const halfWidth = SCREEN_WIDTH * 0.4;

export const LatestStories = memo(()=>{
    const {scroll, activate} = useStateStore<{scroll:number; activate: boolean}>('ui', 'latestStories',['scroll'])||{scroll: 0, activate: false}
    const {white} = useTheme().colors;
    const inerStyles = useMemo(()=>{
        return {
            container: {width: '100%', backgroundColor: white, zIndex: 5}
        }
    },[{}])
    let first = scroll*150;
    if(first>halfWidth){
        first = halfWidth;
    }
    let shrink = 1-(scroll/20);
    if(shrink<0.7){
        shrink = 0;
    }
    let scrollLeft = scroll*75;
    return (
        <View style={inerStyles.container as any}>
            <View style={{marginLeft: 5}}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={[styles.storiesScrll, {marginLeft: scrollLeft+80 }]} >
                    
                    <View style={{transform: [{scale: shrink}]}}>
                        <StatusHead propsSource='' load={!true} />
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <StatusHead propsSource='' load={!true} />
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <StatusHead propsSource='' load={!true} />
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <StatusHead propsSource='' load={!true} />
                    </View>
                    <View style={{transform: [{scale: shrink}]}}>
                        <StatusHead propsSource='' load={!true} />
                    </View>
                </ScrollView>
            </View>
            <Animatable.View style={{backgroundColor: white, marginTop: -72.5 , marginLeft: first, width: 73,  transform: [{scale: 1+scroll}]}}>
                <StatusHead propsSource='' load={!true}  />
            </Animatable.View>
            
        </View>
    )
})

const StatusHeadLoading = createComponent(({propsSource}) => {
    //  props: SVGProps<any>
    const {neutral, white} = useTheme().colors;
    return (
        <ContentLoader 
          speed={2}
          width={ProfileHeadSize}
          height={ProfileHeadSize}
          viewBox="0 0 60 60"
          backgroundColor={neutral}
          foregroundColor={white}
          style={{
            margin: 0,
            marginHorizontal: horizontalMargin,
            // backgroundColor: 'red',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        //   {...props}
        >
          <Circle cx="30" cy="30" r="30" />
        </ContentLoader>
    )
})






const styles = StyleSheet.create({
    round: {
        borderRadius: 9999,
        width: ProfileHeadSize, height: ProfileHeadSize,
        marginHorizontal: horizontalMargin,
        // marginVertical: 8
    },
    storiesScrll: {
        paddingVertical: 15,
    },
    heading: {
        fontSize: 30, fontWeight: 'bold', 
        marginBottom: 15, marginTop:10, 
        marginLeft: 15
    }
})