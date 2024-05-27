import { Article } from '@/components/article';
import { Button } from '@/components/button';
import { Heading, useDynamicMemoStyles } from '@/components/global';
import { SearchBar } from '@/components/search';
import { useTheme } from '@/constants/Theme';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const dummyArticleData = {
  imageSrc:'', title:'Children Science Education', 
  caption: 'Children are very inportant figures in our communities and the whole world at large. Their knowledge in sci'
}


export default function HomeScreen() {
  const {background,white, neutral} = useTheme().colors;
  const [data,setData] = useState((new Array(11)).fill(null).fill(dummyArticleData,3))
  return (
    <View style={[styles.container,{backgroundColor:white}]}>
      <FlatList 
        data={data}
        renderItem={RenderItem}
        stickyHeaderIndices={[1]}
        onEndReached={({distanceFromEnd})=>{}}
        onEndReachedThreshold={0.7}
        ListFooterComponent={<ActivityIndicator size='small' style={{marginTop: 15,marginBottom: 5}} />}
      />
    </View>
  );
}

const RenderItem: ListRenderItem<any> = ({index,item})=>{
  switch (index) {
    case 0:
      return <Greetings />
    case 1:
      return <SearchBarSpace />
    case 2:
      return <ButtonTabs />
    default:
      return <Article {...item} />
  }
}



const Greetings = ()=>{
  const { white, black } = useTheme().colors;
  const dynamicStyles = useDynamicMemoStyles(()=>{

    return {
      container: {
        backgroundColor: white,
        paddingHorizontal: 20,
        alignItems: 'center',

      }
    }
  },[white])
  return (
    <View style={dynamicStyles.container}>
      <SafeAreaView style={styles.greeting}>
          <Heading type='h2'>{'Welcome Bismark!'}</Heading>
          <Pressable onPress={undefined} >
              <Feather size={26} color={black} name='settings' />
          </Pressable>
      </SafeAreaView>
    </View>
  )
}


const SearchBarSpace = ()=>{
  const { white, black } = useTheme().colors;
  const dynamicStyles = useDynamicMemoStyles(()=>{

    return {
      container: {
        backgroundColor: white,
        paddingBottom: 10,
      }
    }
  },[white])

  return (
    <SafeAreaView style={dynamicStyles.container} >
      <SearchBar />
    </SafeAreaView>
  )
}

const tabButtons = [
  'Explore', 'Science', 'History', 'Programming', 'Mathematics', 
  'Web design', 'Mobile app dev'
]
const ButtonTabs = ()=>{
  const { white } = useTheme().colors;
  const dynamicStyles = useDynamicMemoStyles(()=>{

    return {
      buttonTabs: {
          backgroundColor: white,
      }
    }
  },[white])
  return (
   <View style={dynamicStyles.buttonTabs}>
       <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.buttonTabs} >
        {tabButtons.map((title)=> <Button key={title} active={title==='Explore'} title={title} style={styles.buttons} />)}
      </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  greeting:{
    paddingTop: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  buttonTabs:{
    paddingVertical: 5,
    marginTop: 0,
    paddingLeft: 10,
  },
  buttons:{
    marginRight: 10
  }

});
