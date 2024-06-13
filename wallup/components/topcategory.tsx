import { useThemeColors } from "@/constants/Colors";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageSpace } from "./images";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";


type Props = {
    data: ({image?: any; uri?: string; name: string})[];
    onMore?:()=>void
}
export const TopCategory = ({data, onMore}: Props)=>{
    const {text} = useThemeColors()
    // data = data.slice(0, 6)
    return (
        <View>
           <View style={styles.header}>
                <Text style={[styles.textBold, {color: text}]}>All Categories</Text>
                <Octicons name='apps' color={text} size={25} onPress={onMore} />
           </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} horizontal={true} >
                {
                    data.map((item,index)=>{
                        return <CategoryItem  {...item} key={item.name} />
                    })
                }
            </ScrollView>
        </View>
    )
}

export const CategoryItem = (item: Props['data'][0]&{inColumns?:boolean;})=>{
    const {text} = useThemeColors();
    const size = item.inColumns?65: 50;
    const onPress = ()=>{
        router.push(`/category/${item.name}`)
    }
    return (
        <TouchableOpacity onPress={onPress} style={!item.inColumns?styles.item:[styles.item,{flexDirection: 'column', marginBottom: 25}]}>
            <ImageSpace width={size} height={size} radius={size} loader={false} uri={item.uri} image={item.image} />
            <Text style={[styles.itemText, !item.inColumns?{color: text}: {color: text, marginLeft: 0, marginTop: 10}]}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexWrap: 'wrap',
        // justifyContent: 'space-around',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    textBold: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginVertical: 10,

    },
    scrollContainer:{
        paddingLeft: 15,
        paddingRight: 25,
        paddingVertical: 5
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 20,
    },
    itemText: {
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 6,
    }
})