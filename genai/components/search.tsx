import { Pressable, StyleSheet, TextInput, View } from "react-native"
import { getScreenPercentageNumber, useDynamicMemoStyles } from "./global";
import { useTheme } from "@/constants/Theme";
import { Feather } from "@expo/vector-icons";

export const SearchBar = ()=>{
    const {searchBar,fadedBlack} = useTheme().colors;
    const styles = useDynamicMemoStyles(()=>{
        return {
            container: [
                searchStyle.container,
                searchStyle.outerMost,
                {
                    backgroundColor: searchBar,
                    justifyContent: undefined
                }
            ],
            textInput: [
                searchStyle.textInput,
                {
                    color: fadedBlack,
                    fontWeight: '700'
                }
            ],
            
        }
    },[fadedBlack])
    return (
        <View style={searchStyle.outerMost}>
            <Pressable style={styles.container}>
                <View style={searchStyle.searchIcon}>
                    <Feather name='search' size={24} color={fadedBlack} />
                </View>
                <TextInput style={styles.textInput} maxLength={32} placeholderTextColor={'gray'} placeholder="Search topic" keyboardAppearance='light' returnKeyType='search' />
            </Pressable>
        </View>
    )
}

const searchBarWidthPercentage = 90;
const searchBarHeight = 35;
const searchStyle = StyleSheet.create({
    outerMost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        height: searchBarHeight,
        width: `${searchBarWidthPercentage}%`,
        borderRadius: 10
    },
    textInput:{
        backgroundColor: 'rgba(0,0,0,0)',
        width: getScreenPercentageNumber(searchBarWidthPercentage) - 40,
        height: searchBarHeight,
        
    },
    searchIcon: {
        width: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})