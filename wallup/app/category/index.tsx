import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
// import { CatPage } from "./[id]";

export default function Category(){
    const {id} = useLocalSearchParams<{id:string}>()
    return <View></View>
}

// type Props = {
//     name: string
// }
// const CatPage = ({name}: Props)=>{
//     const {background, text} = useThemeColors();

//     return (
//         <View style={[styles.container, {backgroundColor: background}]} >
//             <SafeAreaView>
//                 <TouchableOpacity style={styles.header}>
//                     <Feather name='arrow-left' size={27} color={text} style={{}} />
//                     <Text style={[styles.textBold, {color: text}]}>{name}</Text>
//                 </TouchableOpacity>

//             </SafeAreaView>
//         </View>
//     )
// }