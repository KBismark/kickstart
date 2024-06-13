import { ImageSpace } from "@/components/images";
import { NonTriggerData, ScreenWidth, serverURL } from "@/constants";
import { useThemeColors } from "@/constants/Colors";
import { DummyCategoryData } from "@/constants/data";
import { addItems } from "@/store/slices";
import { RootStateStore, useAppDispatch } from "@/store/store";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux";

type Props = {
    name: string
}
const CatPage = ({name}: Props)=>{
    const {background, text} = useThemeColors();
    const dispatch = useAppDispatch();
    const  categoryData = useSelector<RootStateStore,RootStateStore['categories']['value']['']>((state)=>{
        return state.categories.value[name]
    })||[];
    useEffect(()=>{
        if(categoryInfo[name].count<1){
            fetchPosts();
        }
        
    },[])

    const fetchPosts = ()=>{
        fetch(`${serverURL}/category/${name.toLowerCase()}?r=${categoryInfo[name].count}`)
        .then((response)=>{
            response.json()
            .then((data: typeof categoryData)=>{
                (NonTriggerData as any).category[name].count = data.length;
                dispatch(addItems({name: name, items: data}));
            })
            .catch((err)=>{

            })
            
        })
        .catch((err)=>{
            console.log(err);
            setTimeout(() => {
                (NonTriggerData as any).category[name].count = DummyCategoryData[name].length;
                dispatch(addItems({name: name, items: DummyCategoryData[name]}));

            }, 3000);
            
        })
    }

    const {category: categoryInfo, singles: singlesInfo} = NonTriggerData as any;
    if(!categoryInfo[name]){
        (NonTriggerData as any).category[name] = {count: 0}
    };

    let width = 150;
    let colums = 2;
    if(ScreenWidth>=370){    
        colums = 3;
    }else if(ScreenWidth>=625){    
        colums = 4;
    }
    width = (ScreenWidth-(colums*5))/ colums;

    const onBack = ()=>{
        if(router.canGoBack()){
            router.back();
        }else{
            router.push('/')
        }
    }

    const onItemPress = (image: any)=>{
        singlesInfo.title = name;
        singlesInfo.image = image;
        router.push(`/singles/${name}`)
    }

   

    return (
        <View style={[styles.container, {backgroundColor: background}]} >
            <SafeAreaView>
                <TouchableOpacity onPress={onBack} style={styles.header}>
                    <Feather name='arrow-left' size={27} color={text} />
                    <Text style={[styles.textBold, {color: text}]}>{name}</Text>
                </TouchableOpacity>
                <FlatList
                    initialNumToRender={6}
                    numColumns={colums}
                    ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15}} />}
                    data={categoryData}
                    contentContainerStyle={{paddingLeft: 5}}
                    renderItem={({item,index})=>{
                        return (
                            <TouchableOpacity style={styles.imageItem} onPress={()=>onItemPress(item.image)} >
                                <ImageSpace width={width} height={360} radius={5} loader={true} uri={''} image={item.image} />
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item,index)=> `item-${index}`}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <>
                            {
                                [1,2,3].map((item, index)=>{
                                    return (
                                        <View key={`iten-${index}`} style={{flexDirection: 'row', overflow: 'hidden'}}>
                                            <View style={styles.imageItem} >
                                                <ImageSpace width={width} height={360} radius={5} loader={true} uri={undefined} image={undefined} />
                                            </View>
                                            <View style={styles.imageItem} >
                                                <ImageSpace width={width} height={360} radius={5} loader={true} uri={undefined} image={undefined} />
                                            </View>
                                            {
                                                colums>2&&
                                                <View style={styles.imageItem} >
                                                    <ImageSpace width={width} height={360} radius={5} loader={true} uri={undefined} image={undefined} />
                                                </View>
                                            }
                                            {
                                                colums>3&&
                                                <View style={styles.imageItem} >
                                                    <ImageSpace width={width} height={360} radius={5} loader={true} uri={undefined} image={undefined} />
                                                </View>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </>
                    }
                />
            </SafeAreaView>
        </View>
    )
}

export default function Category(){
    const {id} = useLocalSearchParams<{id:string}>()
    return <CatPage name={id||'Explore'} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
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
    imageItem:{
        marginRight: 5,
        marginBottom: 5,
    }

})