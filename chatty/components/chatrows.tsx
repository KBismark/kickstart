import React, { useState, useRef, useEffect, memo } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    View,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';
import { LatestStories } from './status';
import { Row } from './chatrow';
import { getStore, updateStore, useStateStore } from 'statestorejs';
import { AccountUser } from '@/stores/types';
import { WINDOW_WIDTH } from '@/constants/Screen';
import { Text } from '@/constants/Theme';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const rowTranslateAnimatedValues: {[k:string]: Animated.Value} = {};
// Array(20)
//     .fill('')
//     .forEach((_, i) => {
//         rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
//     });

let scroll: {scroll:number; activate: boolean};
export function Chats() {
    const {contactList, id} = useStateStore<AccountUser>('account', 'main', ['contactList'])||{contactList: []};
    // const [total, setTotal] = useState(0);
    // const [listData, setListData] = useState<string[]>(
    //     // Array(20)
    //     //     .fill('')
    //     //     .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    //     contactList
    // );
    // contactList.forEach((id, i) => {
    //     rowTranslateAnimatedValues[id] = new Animated.Value(1);
    // });
    // return <View></View>
    // // useEffect(()=>{
    // //     console.log('Total: '+total);
        
    // //     contactList.forEach((id, i) => {
    // //         rowTranslateAnimatedValues[id] = new Animated.Value(1);
    // //     });
    // //     // if(total!==contactList.length){
    // //     //     setTimeout(() => {
    // //     //         console.log('Timeout');
                
    // //     //         setListData(contactList);
    // //     //         setTotal(contactList.length)
    // //     //     }, 2000);
    // //     // }

    // //     // if(listData.length<1){
    // //     //     const {contactList} = getStore<AccountUser>('account', 'main')||{contactList: []};

    // //     //     console.log(contactList.slice(0,6), 'here');

    // //     //     if(contactList.length>0){

    // //     //         contactList.forEach((id, i) => {
    // //     //             rowTranslateAnimatedValues[id] = new Animated.Value(1);
    // //     //         });

    // //     //         setTimeout(() => {
    // //     //             console.log(contactList.length);
                    
    // //     //             setListData(contactList as string[])
    // //     //         }, 1000);
    // //     //     }
    // //     // }
    // // },[contactList.length])

    // const animationIsRunning = useRef(false);

    // const onSwipeValueChange = (swipeData: {key: string;value: number}) => {
    //     const { key, value } = swipeData;
    //     if (
    //         value < -WINDOW_WIDTH &&
    //         !animationIsRunning.current
    //     ) {
    //         animationIsRunning.current = true;
    //         Animated.timing(rowTranslateAnimatedValues[key], {
    //             toValue: 0,
    //             duration: 200,
    //             useNativeDriver: false,
    //         }).start(() => {
    //             const newData = [...listData];
    //             const prevIndex = listData.findIndex(item => item === key);
    //             newData.splice(prevIndex, 1);
    //             setListData(newData);
    //             animationIsRunning.current = false;
    //         });
    //     }
    // };
    // // rowData, rowMap


    return (
    <View>
         {/* <SwipeListView
            initialNumToRender={15}
            ListHeaderComponent={()=><LatestStories />}
            useFlatList={true}
            disableRightSwipe={true}
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-WINDOW_WIDTH}
            onSwipeValueChange={onSwipeValueChange}
            useNativeDriver={false}
            onRowOpen={(rowKey, rowMap) => {
                // setTimeout(() => {
                //     rowMap[rowKey].closeRow()
                // }, 2000)
            }}
        /> */}
        <SwipeableFlatList
            initialNumToRender={15}
            ListHeaderComponent={()=>{
                return (
                    <>
                        <LatestStories />
                        <Text style={styles.heading}>Chats</Text>
                    </>
                )
            }}
            data={contactList}
            keyExtractor={(item) => item}
            renderItem={RenderItem}
            // renderLeftActions={renderLeftActions}
            renderRightActions={renderHiddenItem}
           onScroll={(e)=> {
                let y = e.nativeEvent.contentOffset.y;
                if(y>=-100){
                    if(y<50){
                        scroll = getStore<{scroll:number; activate: boolean}>('ui', 'latestStories')||{scroll:0, activate: false}
                        if(scroll.scroll!==0){
                            updateStore<{scroll:number; activate: boolean}>('ui', 'latestStories', {actors: ['scroll'], store: {scroll: 0, activate: false}})
                        }
                    }
                    return;
                };

                y = ((-1)*(e.nativeEvent.contentOffset.y+100))/100;
                // console.log(y);
                updateStore<{scroll:number; activate: boolean}>('ui', 'latestStories', {actors: ['scroll'], store: {scroll: y}})
                
           }}
        />
    </View>
    );
}

const renderHiddenItem = () => {
    return (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </View>
        </View>
    )
};

const RenderItem = (data: {item: string}) => {
    return <Row propsSource={data.item}/>
    // (
    // //     <Animated.View
    // //     style={[
    // //         // styles.rowFrontContainer,
    // //         {
    // //             height: rowTranslateAnimatedValues[
    // //                 data.item
    // //             ].interpolate({
    // //                 inputRange: [0, 1],
    // //                 outputRange: [0, 81],
    // //             }),
    // //         },
    // //     ]}
    // // >
    //     <Row propsSource={data.item}/>
    // // </Animated.View>
    // )
};



export const Conversations = memo(Chats)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        // flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    heading: {
        fontSize: 30, fontWeight: 'bold', 
        marginBottom: 15, marginTop:10, 
        marginLeft: 15
    }
});

