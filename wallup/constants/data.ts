
export const CatItems: {[k:string]: any} = {
    'Natue': require('../assets/images/nature.jpg'),
    'Cars':  require('../assets/images/car.jpg'),
    'Abstract': require('../assets/images/abstract.jpg'),
    'Animals': require('../assets/images/animal.jpg'),
    'Artistic': require('../assets/images/artistic.jpeg'),
    'Sports': require('../assets/images/soccer.jpg'),
    'Music': require('../assets/images/music.jpg')
};


type Posts = {
    [k:string]: {
      data: ({image?: any; uri?: string; id?: string})[];
      username: string;
      image?: any; uri?: string;
      userLink?: string;
      
    }
  }


  export const DummyPost: Posts = {
    'KBismark':  {
        username: 'KBismark', 
        image: require('../assets/images/nature.jpg'),
        uri: '',
        userLink: '',
        data: [
            {image:  require('../assets/images/image1.jpeg')},
            {image:  require('../assets/images/image2.jpeg')},
            {image:  require('../assets/images/image3.jpeg')},
            {image:  require('../assets/images/image4.jpeg')},
            {image:  require('../assets/images/image5.jpeg')},
            {image:  require('../assets/images/image6.jpeg')},
        ]
    },
    'WallpaperZone': {
        username: 'WallpaperZone', 
        image: require('../assets/images/music.jpg'),
        uri: '',
        userLink: '',
        data: [
            {image:  require('../assets/images/image7.jpeg')},
            {image:  require('../assets/images/image8.jpeg')},
            {image:  require('../assets/images/image2.jpeg')},
            {image:  require('../assets/images/image6.jpeg')},
            {image:  require('../assets/images/image1.jpeg')},
            {image:  require('../assets/images/image4.jpeg')},
        ]
    },

  }


const catData = [
    {image:  require('../assets/images/image1.jpeg')},
    {image:  require('../assets/images/image2.jpeg')},
    {image:  require('../assets/images/image3.jpeg')},
    {image:  require('../assets/images/image4.jpeg')},
    {image:  require('../assets/images/image5.jpeg')},
    {image:  require('../assets/images/image6.jpeg')},
    {image:  require('../assets/images/image7.jpeg')},
    {image:  require('../assets/images/image8.jpeg')},
    {image:  require('../assets/images/image4.jpeg')},
    {image:  require('../assets/images/image5.jpeg')},
    {image:  require('../assets/images/image6.jpeg')},
    {image:  require('../assets/images/image6.jpeg')},
    {image:  require('../assets/images/image7.jpeg')},
    {image:  require('../assets/images/image8.jpeg')},
    {image:  require('../assets/images/image4.jpeg')}
]
export const DummyCategoryData = (()=>{
    const data: {[k:string]: {image: any}[]} = {};
    Object.keys(CatItems).forEach((name)=>{
        data[name] = catData
    });
    return data;
})()

