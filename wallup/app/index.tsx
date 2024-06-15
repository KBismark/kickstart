import { HomeItem, HomeItemPlaceHolder, HomeItemProps } from "@/components/post";
import { CategoryItem, TopCategory } from "@/components/topcategory";
import { useThemeColors } from "@/constants/Colors";
import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { useEffect, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { addPost } from "@/store/slices";
import { NonTriggerData, serverURL } from "@/constants";
import { useSelector } from "react-redux";
import { DummyPost, CatItems } from "@/constants/data";
import { IntitialScreen } from "@/screens/initial";



export default function Home(){
    const {background} = useThemeColors();
    const bottomSheetRef = useRef<BottomSheetMethods>(null);
    const dispatch = useAppDispatch();
    const posts = useSelector<RootStateStore,RootStateStore['posts']['value']>((state)=>{
        return state.posts.value
    });
    const [top6Selected, setTop6Selection] = useState(false)

    useEffect(()=>{
        if(top6Selected&&postsInfo.count<1){
            fetchPosts();
        }
        
    },[top6Selected])
    
    const {posts: postsInfo} = NonTriggerData;
    const getUsernames = ()=>{
        const usernames = Object.keys(posts);
        postsInfo.count = usernames.length;
        return usernames;
    }

    const fetchPosts = ()=>{
        fetch(`${serverURL}/posts?r=${postsInfo.count}`)
        .then((response)=>{
            response.json()
            .then((data: typeof posts)=>{
                dispatch(addPost(data));
            })
            .catch((err)=>{

            })
            
        })
        .catch((err)=>{
            console.log(err);
            setTimeout(() => {
                dispatch(addPost(DummyPost));
            }, 3000);
            
        })
    }

    if(!top6Selected){
        return <IntitialScreen onDone={()=>setTop6Selection(true)} />
    }
    

    const getBottomSheetRef = ()=>bottomSheetRef;
    const onMorecategories = ()=>{
        bottomSheetRef.current?.open();
    }
   
    
    return (
        <View style={[styles.container, {backgroundColor: background}]}>
           <SafeAreaView>
                <FlatList 
                    ListHeaderComponent={<TopCategory onMore={onMorecategories} data={Object.keys(CatItems).slice(0, 6).map((categoryName)=>{
                        return {image: CatItems[categoryName], name: categoryName}
                    })} />}
                    ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15}} />}
                    data={getUsernames()}
                    renderItem={({item})=><HomeItem username={item} />}
                    keyExtractor={(username)=> username}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <>
                            <HomeItemPlaceHolder />
                            <HomeItemPlaceHolder />
                            <HomeItemPlaceHolder />
                        </>
                    }
                />
                
           </SafeAreaView>
            <Sheet getRef={getBottomSheetRef} />
        </View>
    )
}


const Sheet = ({getRef}: {getRef: ()=> React.RefObject<BottomSheetMethods>})=>{
    const {background} = useThemeColors();
    const [ison, turnOn] = useState(false)
    const data = Object.keys(CatItems).map((categoryName)=>{
        return {image: CatItems[categoryName], name: categoryName}
    });

    return (
        <>
           {ison&& <BlurView intensity={40} style={{flex: 1, position: 'absolute', width: '100%', height: '100%' }}></BlurView>}
            <BottomSheet 
                height={'60%'} ref={getRef()} 
                style={{
                    backgroundColor: background,  
                    paddingLeft: 15
                }}
                customBackdropComponent={(props)=>{

                    return (
                        <Pressable style={{flex: 1}} onPress={()=>getRef().current?.close()}></Pressable>
                    )
                }}
                onClose={()=>{
                    turnOn(false)
                }}
                onOpen={()=>{
                    turnOn(true)
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScrollView}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: '30%'}}>
                        {
                            data.map((item,index)=>{
                                return <CategoryItem {...item} inColumns={true} key={item.name} />
                            })
                        }
                    </View>
                    
                </ScrollView>
            </BottomSheet>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sheetScrollView:{
        // flexDirection: 'row'
        // height: '100%',
        // flex: 1
    },
    bottomSheet:{
        paddingLeft: 15
    }
})