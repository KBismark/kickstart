import { Article, ProfileImage } from '@/components/article';
import { Button } from '@/components/button';
import { Heading, ScreenWidth, currentActiveTab, getScreenHeightPercentageNumber, getScreenPercentageNumber, itemPaged, mainScreen, overlayControl, scrollable, tabButtons, tabScreenScrollPositions, useDynamicMemoStyles } from '@/components/global';
import { ScreenHeader } from '@/components/screenhead';
import { SearchBar, SearchBarSpace } from '@/components/search';
import { useTheme } from '@/constants/Theme';
import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ListRenderItem, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, GestureHandlerRootView, FlatList, Swipeable } from "react-native-gesture-handler";
// import { Scrollable } from 'react-native-paging-swipper';
import { Scrollable } from '../components/dist/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonTabs } from '@/components/toptabbuttons';
import * as Animatable from 'react-native-animatable';
import { DrawableContainer } from '@/components/drawablecontainer';
import { ExpoRouter } from '@/.expo/types/router';
const {FlatListScreenContainer, Screen,ScrollViewScreenContainer,getGestureData, NestedFlatListScreenContainer} = Scrollable;

const dummyArticleData = {
  imageSrc:'', title:'Children Science Education', 
  caption: 'Children are very inportant figures in our communities and the whole world at large. Their knowledge in sci'
}




export default function SavedScreen() {
    const {background,white, neutral} = useTheme().colors;
    const [drawerOn,setDrawer] = useState<undefined|boolean>(undefined)
    const [data,setData] = useState((new Array(6)).fill(dummyArticleData));
    // const [scroll,setScroll] = useState(true);
    // const lastIndex = data.length-1;
    const ref = useRef<FlatList>(null);
    const onMenu = ()=>{
      setDrawer(true)
    }
    const onExitDrawer = (newScreen?:ExpoRouter.Href)=> setDrawer(false);

    return (
      <DrawableContainer screen='/saved' onExit={onExitDrawer} drawerOn={drawerOn} >
        <GestureHandlerRootView style={[{backgroundColor:neutral,flex:1}]}>
          <ScreenHeader title='Saved' onMenu={onMenu} />
          <FlatList 
              // contentContainerStyle={{
              //     backgroundColor:neutral,
              // }}
            // initialNumToRender={4}
          //   scrollEnabled={scroll}
            ref={ref}
            data={data}
            renderItem={({index,item})=>{
              // if(index===0) return <ScreenHeader title='Saved' />;
              return <Article {...item} />
              // index!==lastIndex?<Article {...item} />: <Overlay/>
            }}
          //   stickyHeaderIndices={[0]}
            keyExtractor={(item,index)=>`${index}`}
            onEndReached={({distanceFromEnd})=>{}}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
              <>
                <ActivityIndicator size='small' style={{marginTop: 15,marginBottom: 5}} />
                
              </>
            }
            onRefresh={()=>{
              // if(enableScroll){
              //   setScroll(false);
              // }
            }}
            refreshing={!false}
          //   onScroll={(e)=>{
          //     const tabData: any = tabScreenScrollPositions[tabName];
          //     const positionY = tabData.positionY;
          //     // Sync our Flatlist scroll position with our main screen's Scrollview position
          //     const yLength = e.nativeEvent.contentOffset.y;
          //     // yLength = yLength<0?0:yLength;
          //     // Math.abs(
                
          //     //   // - ((tabScreenScrollPositions as any).fresh? mainScreen.positionY: 0)
          //     // );
          //     if(mainScreen.positionY>125){
          //       mainScreen.positionY = 125;
          //     }
          //     const diff = yLength - positionY ;
          //     const mainScrollSize = mainScreen.positionY + diff;
          //     // const isolatedHalfHeight = halfHeight+(mainScreen.positionY||0)
          //     if(mainScrollSize<halfHeight){
                
          //       mainScreen.scrollTo&&mainScreen.scrollTo(mainScrollSize<0?0:mainScrollSize);
    
          //       // +(true||(tabScreenScrollPositions as any).fresh?mainScreen.positionY:0)
          //     }
          //     tabData.positionY = yLength;
          //     (tabScreenScrollPositions as any).fresh = false;
          //   }}

          />
          
        </GestureHandlerRootView>
      </DrawableContainer>
    );
  }