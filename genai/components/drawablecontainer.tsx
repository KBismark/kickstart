import { Article, ProfileImage } from '@/components/article';
import { Button } from '@/components/button';
import { Heading, getScreenPercentageNumber } from '@/components/global';
import { useTheme } from '@/constants/Theme';
import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { Scrollable } from 'react-native-paging-swipper';
// import { Scrollable } from './dist/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';
import { ExpoRouter } from '@/.expo/types/router';




type Props = {
    children?:React.ReactNode|React.JSX.Element;
    drawerOn?: boolean;
    onExit?: (newScreen?: ExpoRouter.Href)=>void;
    screen: '/'|'/saved'
}

const _70percernt = getScreenPercentageNumber(70);

export function DrawableContainer({children,drawerOn,onExit,screen}: Props) {
  const {background,white, neutral, primary, fadedBlack} = useTheme().colors;
//   const [onHome,setOnHome] = useState(true);
//   const [drawerOn,setDrawer] = useState<undefined|boolean>(undefined)
  
  
  const exitDrawer = ()=>{
    onExit&&onExit()
  }

  const backFromDrawer = (newScreen?:ExpoRouter.Href)=>{
    // setDrawer(false);
    
    if(newScreen){
      setTimeout(() => {
        router.push(newScreen)
      }, 700);
    }
    onExit&&onExit(newScreen)
  }

  return (
    <>
    <Animatable.View 
      style={[{backgroundColor: white,flex: 1}]}
      duration={500}
      animation={drawerOn?{
        from: {
          // backgroundColor: 'rgba(0,0,0,0)',
          transform: [
            {
              // translateX: 0,
              translateY: 0
            },
            {
              translateX: 0
            }
          ]
        },
        to: {
          // backgroundColor: white,
          transform: [
            {
              // translateX: 150,
              translateY: 20
            },
            {
              translateX: -(_70percernt)
            }
          ]
        }
      }
      :
      typeof drawerOn === 'undefined'?undefined:
      {
        from: {
          // backgroundColor: white,
          transform: [
            {
              // translateX: 0,
              translateY: 20
            },
            {
              translateX: -(_70percernt)
            }
          ]
        },
        to: {
          // backgroundColor: 'rgba(0,0,0,0)',
          transform: [
            {
              // translateX: 150,
              translateY: 0
            },
            {
              translateX: 0
            }
          ]
        }
      }
    }
    >
        
       {children}
      
    </Animatable.View>
    {
      drawerOn&&
      <Pressable onPress={exitDrawer} style={{backgroundColor: 'rgba(0,0,0,0.4)',position: 'absolute',top:0,bottom:0,right: 0, left:0,flex: 1}}></Pressable>

    }
    {
            drawerOn&&
            <Animatable.View 
              duration={500}
              animation={{
                from: {
                  transform: [
                    {translateX: _70percernt}
                  ]
                },
                to:{
                  transform: [
                    {translateX: 0}
                  ]
                }
              }}
              style={{backgroundColor: white,position: 'absolute',top:0,bottom:0,right: 0, flex: 1,width: _70percernt}}
            >
              <SafeAreaView style={{marginHorizontal: 10}} >
                <View style={{flexDirection: 'row',alignItems: 'center',paddingBottom:5,borderColor: neutral,borderBottomWidth: 1}}>
                  {/* <Pressable style={{marginRight: 10}} onPress={onMenu} >
                      <Feather size={26} color={fadedBlack} name='menu' />
                  </Pressable> */}
                  
                  <View style={{flexDirection: 'row',alignItems: 'center'}}>
                      <Pressable style={{marginRight: 10}} onPress={exitDrawer} >
                          <Feather size={26} color={fadedBlack} name='chevron-left' />
                      </Pressable>
                      <ProfileImage width={35} height={35} />
                      {/* <Heading type='h4'>{'@KBismark'}</Heading> */}
                      <Button active={true} title='Log in' style={{paddingVertical: 8,paddingHorizontal: 20}} />
                  </View>
                </View>
                {
                    screen==='/'?
                    <TouchableOpacity onPress={exitDrawer} style={[styles.options,{ borderColor: neutral,}]}>
                        <Feather name='home' color={primary} size={30} style={{marginRight: 6}} />
                        <Heading type='h2' style={{color:primary}}>Home</Heading>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>backFromDrawer('/')} style={[styles.options,{ borderColor: neutral,}]}>
                        <Feather name='home' color={fadedBlack} size={27} style={{marginRight: 6}} />
                        <Heading type='h4'>Home</Heading>
                    </TouchableOpacity>
                }
                {
                    screen==='/saved'?
                    <TouchableOpacity onPress={exitDrawer} style={[styles.options,{ borderColor: neutral,}]}>
                        <Feather name='bookmark' color={primary} size={30} style={{marginRight: 6}} />
                        <Heading type='h2' style={{color:primary}} >Saved</Heading>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>backFromDrawer('/saved')} style={[styles.options,{ borderColor: neutral,}]}>
                        <Feather name='bookmark' color={fadedBlack} size={28} style={{marginRight: 6}} />
                        <Heading type='h4'>Saved</Heading>
                    </TouchableOpacity>
                }
                
              </SafeAreaView>
            </Animatable.View>

          }
    </>
  );
}

const styles = StyleSheet.create({
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1
    }
})