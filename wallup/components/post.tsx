import { useThemeColors } from "@/constants/Colors";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageSpace } from "./images";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { updateCurrentItem, addPost } from "@/store/slices";
import { useSelector } from "react-redux";
import { NonTriggerData } from "@/constants";


export type HomeItemProps = {
    data: ({image?: any; uri?: string; id?: string})[];
    username: string;
    image?: any; uri?: string;
    userLink?: string;
    
}
export const HomeItem = ({username}: {username: string})=>{
    const {text, primary, divider, white, background, gray0, gray1, gray2} = useThemeColors();
    const dispatch = useAppDispatch();

    let {data, image, uri, userLink} = useSelector<RootStateStore, RootStateStore['posts']['value']['']>(({posts})=>posts.value[username])||{};

    if(!data) return <HomeItemPlaceHolder />;
    data = data.slice(0, 6);

    const {user: userInfo} = NonTriggerData;

    const onImageClick = (username: string, index: number)=>{
        // console.log(image);
        userInfo.current = {
            index,
            image: data[index].image,
            username
        };
        dispatch(updateCurrentItem({username, image: data[index].image}));
        router.push(`/user/${username}`);
    }

    return (
        <View style={[styles.container, {backgroundColor: white, borderTopColor: divider, borderTopWidth: 1}]}>
            <View style={[styles.item, {justifyContent: 'space-between', paddingHorizontal: 15}]}>
                {/* <View style={[styles.item, {marginBottom: 0}]}>
                    <ImageSpace width={45} height={45} radius={50} loader={false} uri={uri} image={image} />
                    <Text style={[styles.itemText, {color: text}]}>From {username}</Text>
                </View> */}
                {/* <TouchableOpacity onPress={undefined} style={[styles.item, styles.followSection]} > */}
                    <TouchableOpacity onPress={undefined} style={[styles.item, {marginBottom: 0}]}>
                        <ImageSpace width={35} height={35} radius={50} loader={false} uri={uri} image={image} />
                        {/* <Text style={[styles.itemText, {color: text}]}>From {username}</Text> */}
                        <Text style={[styles.itemText, {color: text}]}>From {username} on X</Text>
                    </TouchableOpacity>
                    {/* <Text style={[styles.itemText, {color: text}]}>Follow {username} on X</Text> */}
                    {/* <Feather name='chevron-right' size={18} color={text} /> */}
                {/* </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>onImageClick(username, 0)} style={[styles.item, {marginBottom: 0}]}>
                    <Text style={[styles.itemText, {color: text}]}>See all</Text>
                    <Feather name='chevron-right' size={18} color={text} />
                </TouchableOpacity>
            </View>
            {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.scrollContainer}>
                {
                    data.map((item:any,index:any)=>{
                        return (
                            <Pressable key={item.id||`item-${index}`} style={styles.imageItem} onPress={()=>onImageClick(username, index)} >
                                <ImageSpace width={150} height={330} radius={5} loader={true} uri={item.uri} image={item.image} />
                            </Pressable>
                        )
                    })
                }
            </ScrollView> */}
            <FlatList 
                initialNumToRender={3}
                showsHorizontalScrollIndicator={false} 
                horizontal={true}
                contentContainerStyle={styles.scrollContainer}
                data={data}
                renderItem={({item, index})=>{
                    return (
                        <Pressable key={item.id||`item-${index}`} style={styles.imageItem} onPress={()=>onImageClick(username, index)} >
                            <ImageSpace width={150} height={330} radius={5} loader={true} uri={item.uri} image={item.image} />
                        </Pressable>
                    )
                }}
            />
            {/* <TouchableOpacity onPress={undefined} style={[styles.item, styles.followSection, {borderTopColor: divider, borderTopWidth: 1, marginTop: 10 }]} >
                <Text style={[styles.itemText, {color: text}]}>Follow {username} on X</Text>
                <Feather name='chevron-right' size={18} color={text} />
            </TouchableOpacity> */}
        </View>
    )
}

export const HomeItemPlaceHolder = ()=>{
    const { divider, white, background, gray0, gray1, gray2} = useThemeColors();
    return (
        <View style={[styles.container, {backgroundColor: white, borderTopColor: divider, borderTopWidth: 1}]}>
            <View style={[styles.item, {justifyContent: 'space-between', paddingHorizontal: 15}]}>
                    <View style={[styles.item, {marginBottom: 0}]}>
                        <ImageSpace width={35} height={35} radius={50} loader={false} uri={undefined} image={undefined} />
                        <View style={{height: 10, width: 130, borderRadius: 10, marginLeft: 6, backgroundColor: gray1 }}></View>
                    </View>
                <View style={{height: 10, width: 65, borderRadius: 10, marginLeft: 6, backgroundColor: gray1 }}></View>
            </View>
            <FlatList 
                // initialNumToRender={3}
                showsHorizontalScrollIndicator={false} 
                horizontal={true}
                contentContainerStyle={styles.scrollContainer}
                data={[1,2,3]}
                renderItem={({item, index})=>{
                    return (
                        <View key={`item-${index}`} style={styles.imageItem} >
                            <ImageSpace width={150} height={330} radius={5} loader={true} uri={undefined} image={undefined} />
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flexWrap: 'wrap',
        // justifyContent: 'space-evenly',
        // flexDirection: 'row'
        paddingTop: 10,
        paddingBottom: 5,
        marginTop: 10

    },
    imageItem: {
        marginRight: 5,
    },
    scrollContainer:{
        paddingLeft: 15,
        paddingRight: 15
    },
    followSection:{
         marginBottom: 0, 
        //  paddingVertical: 10, 
        // paddingHorizontal: 10, 
        justifyContent: 'space-between'
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    }
})