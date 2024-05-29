import { Article, ProfileImage } from '@/components/article';
import { Button } from '@/components/button';
import { Heading, getScreenHeightPercentageNumber, useDynamicMemoStyles } from '@/components/global';
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
const mainScreen: {
  positionY: number;
  scrollTo?:(yIndex:number)=>void;
  onScroll: {[k:string]: ((positionY: number)=>void)}
} = {positionY: 0, onScroll: {}} as any;
export default function HomeScreen() {
  const {background,white, neutral} = useTheme().colors;
  const [scrollTabScreens,setScrollTabScreens] = useState(false)
  const ref = useRef<ScrollView>(null);
  mainScreen.scrollTo = (y)=>ref.current?.scrollTo({animated: !true,x:0,y:y});
  // enableScroll = scrollTabScreens;
  return (
    <GestureHandlerRootView style={[styles.container,{backgroundColor:white}]}>
      {/* <Scrollable.ScrollViewScreenContainer horizontal={true} gestureData={scrollable} >

      </Scrollable.ScrollViewScreenContainer> */}
      <ScrollView
        ref={ref}
        stickyHeaderIndices={[1]}
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
        <Greetings />
        <SearchBarSpace />
        <ButtonTabs />
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

  return (
    <NestedFlatListScreenContainer
      onScreen={(index)=>{
        (scrollPositions as any).fresh = true;
        // const tabName = tabButtons[index-1].name;
        // const tabData = scrollPositions[tabName];
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
const scrollPositions: {[k:string]: {positionY:number;setScreenScrollPosition?:(position:number)=>void}} = {} as any;

function TabScreen({item}:{item: typeof tabButtons['0']}) {
  const {background,white, neutral} = useTheme().colors;
  const [data,setData] = useState((new Array(4)).fill(dummyArticleData,3));
  const [scroll,setScroll] = useState(enableScroll);
  const ref = useRef<FlatList>(null);
  // enableScroll = scroll;
  const {name:tabName} = item;
  if(!scrollPositions[tabName]){
    scrollPositions[tabName] = {
      positionY: 0,
      setScreenScrollPosition: (position)=>{
        ref.current?.scrollToOffset({animated: false, offset: position});
        // mainScreen.scrollTo&&mainScreen.scrollTo(position)
      }
    };
  }
  
  
  
  return (
    <View style={[styles.container,{backgroundColor:white}]}>
      {/* <Scrollable.ScrollViewScreenContainer horizontal={true} gestureData={scrollable} >

      </Scrollable.ScrollViewScreenContainer> */}
      
      <FlatList 
        // initialNumToRender={4}
        // scrollEnabled={scroll}
        ref={ref}
        data={data}
        renderItem={RenderTabScreenItem}
        // stickyHeaderIndices={[1]}
        keyExtractor={(item,index)=>`${index}`}
        onEndReached={({distanceFromEnd})=>{}}
        onEndReachedThreshold={0.7}
        ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15,marginBottom: 5}} />}
        onRefresh={()=>{
          // if(enableScroll){
          //   setScroll(false);
          // }
        }}
        refreshing={!false}
        onScroll={(e)=>{
          const tabData: any = scrollPositions[tabName];
          const positionY = tabData.positionY;
          // Sync our Flatlist scroll position with our main screen's Scrollview position
          const yLength = e.nativeEvent.contentOffset.y;
          // yLength = yLength<0?0:yLength;
          // Math.abs(
            
          //   // - ((scrollPositions as any).fresh? mainScreen.positionY: 0)
          // );
          if(mainScreen.positionY>125){
            mainScreen.positionY = 125;
          }
          const diff = yLength - positionY ;
          const mainScrollSize = mainScreen.positionY + diff;
          // const isolatedHalfHeight = halfHeight+(mainScreen.positionY||0)
          if(mainScrollSize<halfHeight){
            
            mainScreen.scrollTo&&mainScreen.scrollTo(mainScrollSize<0?0:mainScrollSize);

            // +(true||(scrollPositions as any).fresh?mainScreen.positionY:0)
          }
          tabData.positionY = yLength;
          (scrollPositions as any).fresh = false;
        }}
      />
    </View>
  );
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
      
      if(value<1){
        value = 1;
      }
      let scroll = value/125;
      if(scroll>1){
        scroll = 1;
      }
      let val = 1 - scroll;
      if(val<0.77&&val>0.5){
        val = val - 0.4
      }
     
      
      if(scrollValue<0.8&&val<0.8){return}
      // console.log(val);
      setScrollValue(Math.abs(val));
    }
    return ()=>{
      mainScreen.onScroll.greeting = null as any;
    }
  },[scrollValue])
  
  return (
    <View style={dynamicStyles.container}>
      <SafeAreaView style={[styles.greeting,{opacity: scrollValue,borderBottomColor:neutral,borderBottomWidth:1,paddingBottom: 5}]}>
          <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Pressable style={{marginRight: 10}} onPress={undefined} >
                <Feather size={26} color={fadedBlack} name='menu' />
            </Pressable>
            
            <View>
                {/* <ProfileImage /> */}
                <Heading type='h3'>{'Welcome Bismark!'}</Heading>
            </View>
          </View>
          <Pressable onPress={undefined} >
              <Feather size={26} color={fadedBlack} name='settings' />
          </Pressable>
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
