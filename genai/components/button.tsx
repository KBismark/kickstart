import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native"
import { Heading, Text, useDynamicMemoStyles } from "./global"
import { useTheme } from "@/constants/Theme";
import * as Animatable from 'react-native-animatable';
import { useState } from "react";

type Props = {
    active?: boolean;
    title: string|number,
    onPress?: ()=>void;
    style?: StyleProp<ViewStyle>
}
export const Button = ({active,title,onPress,style}:Props)=>{
    const {primary,neutral,text} = useTheme().colors;
    const [pressing,setPressing] = useState<undefined|boolean>(undefined);
    let timeout:any = undefined;
    const styles = useDynamicMemoStyles(()=>{
        return {
            text: {
                // color: active?'#ffffff':text,
                fontWeight: '700'
            },
            container: [
                buttonStyle.container,
                style,
                {
                    // backgroundColor: active?primary:neutral
                }
            ]
        }
    },[active,style])
    return (
        <Animatable.View
            style={styles.container}
            animation={{
                from:{
                    backgroundColor: active&&!pressing?primary:neutral,
                    opacity: 1,
                },
                to:{
                    backgroundColor: active&&!pressing?primary:neutral,
                    opacity: 1,
                }
            }}
        >
            <Pressable onPressIn={()=>{
                // console.log(67);
                setPressing(true);
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    setPressing(false);
                }, 600);
                
            }}  onPress={()=>{
                setPressing(true)
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    setPressing(false);
                    onPress&&onPress();
                }, 600);
                
            }}>
                
                <Animatable.View 
                    duration={400}
                    animation={pressing?{
                            from:{
                                opacity: 0,
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderRadius: 100,
                                transform: [
                                    {
                                        scale: 0.1,
                                        // translateX: -30,
                                    }
                                ]
                            },
                            to:{
                                opacity: 0.6,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: 100,
                                transform: [
                                    {
                                        scale: 3,
                                        // translateX: 0,
                                    }
                                ]
                            }
                        }:
                        typeof pressing === 'undefined'?undefined:
                        {
                            from:{
                                opacity: 0.6,
                                backgroundColor: 'rgba(0,0,0,0.1)',
                                borderRadius: 100,
                                transform: [
                                    {
                                        scale: 3,
                                        // translateX: 0,
                                    }
                                ]
                            },
                            to:{
                                opacity: 0,
                                backgroundColor: active?primary:neutral,
                                borderRadius: 100,
                                transform: [
                                    {
                                        scale: 0,
                                        // translateX: -30,
                                    }
                                ]
                            }
                        }
                }

                    style={{
                        position:'absolute',
                        top: 0, right: 0,
                        left: 0, bottom: 0,
                        width: 40, height: 40
                        
                    }}
                ></Animatable.View>
                <Text style={{fontWeight: '700',color:active&&!pressing?'#ffffff':text}} type='normal' >{title}</Text>
            </Pressable>
        </Animatable.View>
    )
}


const buttonStyle = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
})