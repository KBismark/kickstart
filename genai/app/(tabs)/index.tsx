import { Article, ProfileImage } from '@/components/article';
import { Button } from '@/components/button';
import { Heading, currentActiveTab, getScreenHeightPercentageNumber, itemPaged, mainScreen, overlayControl, tabScreenScrollPositions, useDynamicMemoStyles } from '@/components/global';
import { ScreenHeader } from '@/components/screenhead';
import { SearchBar, SearchBarSpace } from '@/components/search';
import { useTheme } from '@/constants/Theme';
import { Feather } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView, GestureHandlerRootView, FlatList, Swipeable } from "react-native-gesture-handler";
// import { Scrollable } from 'react-native-paging-swipper';
import { Scrollable } from '../../components/dist';
import { SafeAreaView } from 'react-native-safe-area-context';
const {FlatListScreenContainer, Screen,ScrollViewScreenContainer,getGestureData, NestedFlatListScreenContainer} = Scrollable;

const dummyArticleData = {
  imageSrc:'', title:'Children Science Education', 
  caption: 'Children are very inportant figures in our communities and the whole world at large. Their knowledge in sci'
}

let enableScroll = false;
const scrollable = Scrollable.getGestureData();

export default function HomeScreen() {
  const {background,white, neutral} = useTheme().colors;
  const [scrollTabScreens,setScrollTabScreens] = useState(false)
  const ref = useRef<ScrollView>(null);
  const [scroll,setScroll] = useState(true);
  itemPaged.onPage.mainScreen = (isPaged)=>{
    setScroll(!isPaged);
  };
  mainScreen.scrollTo = (y)=>ref.current?.scrollTo({animated: !true,x:0,y:y});
  // enableScroll = scrollTabScreens;
  return (
    <GestureHandlerRootView style={[styles.container,{backgroundColor:white}]}>
      {/* <Scrollable.ScrollViewScreenContainer horizontal={true} gestureData={scrollable} >

      </Scrollable.ScrollViewScreenContainer> */}
      <ScrollView
        scrollEnabled={scroll}
        ref={ref}
        stickyHeaderIndices={scroll?[0]:undefined}
        showsVerticalScrollIndicator={false}
        onScroll={(e)=>{
          mainScreen.positionY = e.nativeEvent.contentOffset.y;
          const callbacks = mainScreen.onScroll;
          
          for(let key in callbacks){
            callbacks[key]&&callbacks[key](mainScreen.positionY);
          }
          
          // if(yLength>225&&!enableScroll){
          //   setScrollTabScreens(true)
          // }else if(yLength<=225){
          //   setScrollTabScreens(!true)
          // }
        }}
      >
        { scroll&& <Greetings />}
        { scroll&& <SearchBarSpace />}
        { scroll&& <ButtonTabs />}

        <TopTabScreens />
      </ScrollView>
      {/* <FlatList 
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item,index)=>`${index}`}
        stickyHeaderIndices={[1]}
        onEndReached={({distanceFromEnd})=>{}}
        onEndReachedThreshold={0.7}
        // ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15,marginBottom: 5}} />}
      /> */}

    </GestureHandlerRootView>
  );
}

const TopTabScreens = ()=>{
  useEffect(()=>{
    !currentActiveTab.name&&(currentActiveTab.name = tabButtons[0].name);
  },[])
  return (
    <NestedFlatListScreenContainer
      onScreen={(index)=>{
        (tabScreenScrollPositions as any).fresh = true;
        currentActiveTab.name = tabButtons[0].name
        // const tabName = tabButtons[index-1].name;
        // const tabData = tabScreenScrollPositions[tabName];
        // if(tabData&&tabData.setScreenScrollPosition){
        //   tabData.setScreenScrollPosition(tabData.positionY);
        // }
      }}
       horizontal={true}
        gestureData={scrollable}
        data={tabButtons}
        renderItem={TabScreen}
        keyExtractor={({name})=>name}
        // stickyHeaderIndices={[1]}
        // onEndReached={({distanceFromEnd})=>{}}
        // onEndReachedThreshold={0.7}
        // ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15,marginBottom: 5}} />}
      />
  )
}

const halfHeight = getScreenHeightPercentageNumber(30);
const topHeight = getScreenHeightPercentageNumber(20);



function TabScreen({item}:{item: typeof tabButtons['0']}) {
  const {background,white, neutral} = useTheme().colors;
  const [data,setData] = useState((new Array(5)).fill(dummyArticleData));
  const [scroll,setScroll] = useState(true);
  // const lastIndex = data.length-1;
  const ref = useRef<FlatList>(null);
  
  // enableScroll = scroll;
  const {name:tabName} = item;
  if(!tabScreenScrollPositions[tabName]){
    tabScreenScrollPositions[tabName] = {
      positionY: 0,
      setScreenScrollPosition: (position,animate)=>{
        ref.current?.scrollToOffset({animated: !!animate, offset: position});
        // mainScreen.scrollTo&&mainScreen.scrollTo(position)
      }
    };
  }
  itemPaged.onTabOnly[tabName] = (isPaged)=>{
    setScroll(!isPaged);
  };
  
  // overlayControl.show = (s)=>{
  //   console.log(s);
    
  //   setOverlayDisplay(!!s);
  // };
  
  
  return (
    <View style={[styles.container,{backgroundColor:neutral}]}>
      {/* <Scrollable.ScrollViewScreenContainer horizontal={true} gestureData={scrollable} >

      </Scrollable.ScrollViewScreenContainer> */}
      {/* <View style={{backgroundColor: 'rgba(0,0,0)',position: 'absolute',top:0,bottom:0,right: 0, left:0}}></View> */}
      <FlatList 
        // initialNumToRender={4}
        scrollEnabled={scroll}
        ref={ref}
        data={data}
        renderItem={({index,item})=>{
          return <Article {...item} />
          // index!==lastIndex?<Article {...item} />: <Overlay/>
        }}
        // stickyHeaderIndices={[1]}
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
        onScroll={(e)=>{
          const tabData: any = tabScreenScrollPositions[tabName];
          const positionY = tabData.positionY;
          // Sync our Flatlist scroll position with our main screen's Scrollview position
          const yLength = e.nativeEvent.contentOffset.y;
          // yLength = yLength<0?0:yLength;
          // Math.abs(
            
          //   // - ((tabScreenScrollPositions as any).fresh? mainScreen.positionY: 0)
          // );
          if(mainScreen.positionY>125){
            mainScreen.positionY = 125;
          }
          const diff = yLength - positionY ;
          const mainScrollSize = mainScreen.positionY + diff;
          // const isolatedHalfHeight = halfHeight+(mainScreen.positionY||0)
          if(mainScrollSize<halfHeight){
            
            mainScreen.scrollTo&&mainScreen.scrollTo(mainScrollSize<0?0:mainScrollSize);

            // +(true||(tabScreenScrollPositions as any).fresh?mainScreen.positionY:0)
          }
          tabData.positionY = yLength;
          (tabScreenScrollPositions as any).fresh = false;
        }}
      />
      {/* <View style={{backgroundColor: 'rgba(0,0,0)',position: 'absolute',top:0,bottom:0,right: 0, left:0}}></View> */}
      
    </View>
  );
}

const Overlay = ({showOverlay}:{showOverlay:boolean})=>{
  // const [showOverlay,setOverlayDisplay] = useState(false);
  // useEffect(()=>{
  //   overlayControl.show = (s)=>{
  //     // console.log(s);
      
  //     setOverlayDisplay(s);
  //   };
  // },[showOverlay])
  
  
  if(!showOverlay){
    return null;
  }
  // console.log(showOverlay);
  // if(!showOverlay){}
  return (
    <View style={{backgroundColor: 'rgba(0,0,0)',position: 'absolute',top:0,bottom:0,right: 0, left:0}}></View>
  )
}

const RenderTabScreenItem: ListRenderItem<any> = ({index,item})=>{
  return <Article {...item} />
}

const RenderItem: ListRenderItem<any> = ({index,item})=>{
  switch (index) {
    case 0:
      return <Greetings />
    case 1:
      return <SearchBarSpace />
    case 2:
      return <ButtonTabs />
    default:
      return <TopTabScreens />
      // return <Article {...item} />
  }
}



const Greetings = ()=>{
  const { white, black, text, fadedBlack, neutral } = useTheme().colors;
  const [scrollValue,setScrollValue] = useState(1);
  const dynamicStyles = useDynamicMemoStyles(()=>{

    return {
      container: {
        backgroundColor: white,
        paddingHorizontal: 20,
        alignItems: 'center',
        // marginTop: -10

      },
      // greeting: [
      //   styles.greeting,
      //   {
      //     opacity: 1
      //   }
      // ]
    }
  },[white]);
  useEffect(()=>{
    mainScreen.onScroll.greeting = (value)=>{
      
      // if(value<1){
      //   value = 1;
      // }
      // let scroll = value/125;
      // if(scroll>1){
      //   scroll = 1;
      // }
      // let val = 1 - scroll;
      // if(val<0.77&&val>0.5){
      //   val = val - 0.4
      // }
     
      
      // if(scrollValue<0.8&&val<0.8){return}
      // // console.log(val);
      // setScrollValue(Math.abs(val));
      setScrollValue(value>120?1:0)
    }
    itemPaged.onPage.greeting = (siPaged)=>{

    }
    return ()=>{
      mainScreen.onScroll.greeting = null as any;
      itemPaged.onPage.greeting = null as any;
    }
  },[scrollValue])
  
  return (
    <View style={dynamicStyles.container}>
      <SafeAreaView style={[styles.greeting,{borderBottomColor:neutral,borderBottomWidth:1,paddingBottom: 5}]}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Pressable style={{marginRight: 10}} onPress={undefined} >
                <Feather size={26} color={fadedBlack} name='menu' />
            </Pressable>
            
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                {/* <ProfileImage width={35} height={35} />
                <Heading type='h4'>{'@KBismark!'}</Heading> */}
                <Button active={true} title='Log in' style={{paddingVertical: 8,paddingHorizontal: 20}} />
            </View>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
              {
                !!scrollValue &&
                <Pressable onPress={undefined} style={{backgroundColor: neutral, borderRadius: 50,width: 35,height: 35,flexDirection: 'row',justifyContent:'center',alignItems: 'center',marginRight: 15}}>
                  <Feather size={26} color={fadedBlack} name='search' />
              </Pressable>
              }
            <Pressable onPress={undefined} style={{backgroundColor: neutral, borderRadius: 50,width: 35,height: 35,flexDirection: 'row',justifyContent:'center', alignItems: 'center'}} >
                <Feather size={26} color={fadedBlack} name='settings' />
            </Pressable>
          </View>
          
      </SafeAreaView>
    </View>
  )
}




const tabButtons = [
  {name: 'Explore'}, {name: 'Science'} , {name: 'History'}, 
  {name: 'Programming'}, {name: 'Mathematics'}, 
  {name: 'Web design'}, {name: 'Mobile app dev'}
]
const ButtonTabs = ()=>{
  const { white } = useTheme().colors;
  const [currentTab,setCurrentTab] = useState(tabButtons[0]);
  const dynamicStyles = useDynamicMemoStyles(()=>{

    return {
      buttonTabs: {
          backgroundColor: white,
      }
    }
  },[white])
  return (
   <View style={dynamicStyles.buttonTabs}>
       <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.buttonTabs} >
        {tabButtons.map(({name},index)=> <Button key={name} active={name===currentTab.name} onPress={()=>setCurrentTab(tabButtons[index])} title={name} style={styles.buttons} />)}
      </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  greeting:{
    paddingTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  buttonTabs:{
    paddingTop: 5,
    paddingBottom: 7,
    paddingLeft: 10,
  },
  buttons:{
    marginRight: 10
  }

});
