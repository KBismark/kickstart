import * as React from "react";
import type { ImageSourcePropType } from "react-native";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image as ExpoImage, ImageTransition } from "expo-image";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { BlurView as ExpoBlurView } from "expo-blur";

import { parallaxLayout } from './parallax'
import { ScreenHeight, ScreenWidth } from "@/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useThemeColors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { updateCurrentItem } from "@/store/slices";
import { useSelector } from "react-redux";

// import SButton from "../../components/SButton";
// import { ElementsText, window } from "../../constants";
// import { fruitItems } from "../../utils/items";

const fruitItems = [
    require('../assets/images/image1.jpeg'),
    require('../assets/images/image2.jpeg'),
    require('../assets/images/image3.jpeg'),
]

const BlurView = Animated.createAnimatedComponent(ExpoBlurView);

const PAGE_WIDTH = ScreenWidth / 1;

export function ParallaxCorousel({title, data}: {title: string; data: (string|number)[]}) {
    // const {id: username} = useLocalSearchParams();
    const [isAutoPlay, setIsAutoPlay] = React.useState(false);
    const {text} = useThemeColors();
    const dispatch = useAppDispatch();
    

    // let {data} = useSelector<RootStateStore, RootStateStore['posts']['value']['']>(({posts})=>posts.value[username as string]);
    // let current = useSelector<RootStateStore, RootStateStore['currentItem']['value']>(({currentItem})=>currentItem.value);
    React.useEffect(()=>{

      return ()=>{
        clearTimeout(timeout)
      }
    },[]);

    let timeout: any = undefined;
    const lastIndex = data.length-1;
  
    const onBack = ()=>{
        if(router.canGoBack()){
            router.back();
        }else{
            router.push('/')
        }
    }

  return (
    <SafeAreaView style={{ flex: 1,   }}>
        <SafeAreaView style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={onBack} style={styles.header}>
                <Feather name='arrow-left' size={27} color={text} />
                <Text style={[styles.textBold, {color: text}]}>{title}</Text>
            </TouchableOpacity>
            {/* <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.saveButton]}>
                    <ExpoBlurView style={styles.saveButtonBlur} intensity={30} >
                        <Ionicons name='expand-outline' size={24} color={text} style={{marginTop: -3}} />
                    </ExpoBlurView>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton}>
                <ExpoBlurView style={styles.saveButtonBlur} intensity={30} >
                    <Feather name='download' size={24} color={text} style={{marginTop: -3}} />
                </ExpoBlurView>
            </TouchableOpacity>
            </View> */}
        </SafeAreaView>
      <Carousel
        
        loop={data.length>1}
        autoPlay={isAutoPlay}
        style={{
          width: ScreenWidth,
          height: '100%',
          justifyContent: "center",
          alignItems: "center",
          marginTop: '-2%',
        //   backgroundColor: 'green'
        }}
        width={PAGE_WIDTH}
        height={ScreenHeight-30}
        data={data.map((item)=>item)}
        // defaultIndex={9}
        onProgressChange={(offset,index)=>{
          
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            index = Math.floor(index);
            // if(index>=lastIndex){
            //   index = 0;
            // }
            // if(data[index]){
              dispatch(updateCurrentItem({image: data[index]}));
            // }
          }, 20)
          
          // const decimalValue = index - i; 
          // if(decimalValue>=0.5){
          //   index = Math.ceil(index);
          //   // if(i>=lastIndex){
          //   //   i = 0;
          //   // }else{
          //   //   i++;
          //   // }
          // }else{
          //   index = i;
          // }
          // // console.log(index);
          
          
         
            
        }}
        
        renderItem={({ item, index, animationValue }) => {
          return (
            <CustomItem
              key={index}
              source={item as any}
              animationValue={animationValue}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 0.9,
            parallaxAdjacentItemScale: 0.5,
            parallaxScrollingOffset: 120,
          },
        )}
        scrollAnimationDuration={1000}
      />

      {/* <SButton
        onPress={() => {
          setIsAutoPlay(!isAutoPlay);
        }}
      >
        {ElementsText.AUTOPLAY}:{`${isAutoPlay}`}
      </SButton> */}
    </SafeAreaView>
  );
}

interface ItemProps {
  source: ImageSourcePropType
  animationValue: Animated.SharedValue<number>
}
const imageAnimationTiming: ImageTransition = {timing:'linear',duration:700};
const CustomItem: React.FC<ItemProps> = ({ source, animationValue }) => {
    const {gray1, text} = useThemeColors();
    const [imageloaded, setImageLoad] = React.useState(false);
    const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 0, 1],
    );

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 4,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: gray1

      }}
    >
      <View style={{position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
      </View>
      {/* <Image
        source={source}
        resizeMode={'cover'}
        style={{ width: '100%', height: '100%' }}
      /> */}
      <ExpoImage 

        source={source}
        contentFit='cover' 
        transition={imageAnimationTiming} 
        cachePolicy={'memory-disk'}
        style={styles.image}
        onLoad={()=>{
          setImageLoad(true)
        }}
      />
      {
        imageloaded &&
        <View style={styles.saveContainerInit}>
          <TouchableOpacity style={styles.saveButton}>
            <ExpoBlurView style={[styles.saveButtonBlur, {width: 60, height: 60}]} intensity={60} >
                <Feather name='download' size={28} color={text} style={{marginTop: -3}} />
            </ExpoBlurView>
          </TouchableOpacity>
        </View>
      }
      <BlurView
        intensity={100}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </View>
  );
};



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
        backgroundColor: 'rgba(255,255,255, 0.3)' 
    },
    saveButton: {
        overflow: 'hidden', borderRadius: 15, 
        alignItems: 'center',justifyContent: 'center',
        marginRight: 15
    },
    image: { width: '100%', height: '100%' },
    saveContainerInit: {
      alignItems: 'center', flexDirection: 'row', 
      justifyContent: 'center', position: 'absolute', 
      width: '100%',bottom: 0, marginBottom: 25
    }
})