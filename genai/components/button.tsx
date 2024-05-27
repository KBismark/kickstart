import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native"
import { Heading, Text, useDynamicMemoStyles } from "./global"
import { useTheme } from "@/constants/Theme";

type Props = {
    active?: boolean;
    title: string|number,
    onPress?: ()=>void;
    style?: StyleProp<ViewStyle>
}
export const Button = ({active,title,onPress,style}:Props)=>{
    const {primary,neutral,text} = useTheme().colors;
    const styles = useDynamicMemoStyles(()=>{
        return {
            text: {
                color: active?'#ffffff':text,
                fontWeight: '700'
            },
            container: [
                buttonStyle.container,
                style,
                {
                    backgroundColor: active?primary:neutral
                }
            ]
        }
    },[active,style])
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text} type='normal' >{title}</Text>
        </Pressable>
    )
}


const buttonStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})