import { StyleSheet, ToastAndroid } from 'react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import { upload } from 'cloudinary-react-native'
import { Text, View } from '@/components/Themed';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '@/components/IconButton';
import { useState } from 'react';
import ImageViewer from '@/components/ImageViewer';

export default function TabOneScreen() {
  const [ loading , setLoading ] = useState(false);
  const [hasChosen, setHasChosen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [ url, setUrl ] = useState<string | null>(null);

  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dmgm3t8ld'
    },
    url: {
        secure: true
    }
  });
  const options = {
    upload_preset: 'enu6jkri',
    unsigned: true,
  }

  const pickImageAsync = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setBase64Image(`data:image/jpg;base64,${result.assets[0].base64}`);
      setHasChosen(true);
      ToastAndroid.showWithGravity(`Successfully Chosen ${result.assets[0].fileName}`, ToastAndroid.SHORT, ToastAndroid.CENTER);
    } else {
      ToastAndroid.showWithGravity("You haven't chosen an image", ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    setLoading(false);
  };

  const callMoe = async() => {
    setLoading(true);
    
    await upload(cld, {file: selectedImage , options: options, callback: (error: any, response: any) => {
      //.. handle response
      if (error) {
        console.error(error);
      }
      if (!error && response) {
        console.log(response);
        setUrl(response.url);
        ToastAndroid.showWithGravity(`Found URL`, ToastAndroid.SHORT, ToastAndroid.CENTER);
      }      
    }})
    setLoading(false);
  }
  



  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text> */}
      <View style={styles.imageView}>
        <ImageViewer
            placeholderImageSource={require('../../assets/images/placeholder.svg')}
            selectedImage={selectedImage}
          />
      </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={{display:'flex', flexDirection:'row', marginTop:20, paddingHorizontal:60, paddingVertical:20, borderRadius:20, backgroundColor: 'rgba(255,255,255,0.1)'}}>
          <IconButton onPress={pickImageAsync} name="image" loading={loading} disabled={loading} label='Choose an Image from your Gallery' />
          <IconButton onPress={() => { setSelectedImage(null); setHasChosen(false); }} name="trash" disabled={!hasChosen} label='Remove the Currently selected image' />
          <IconButton onPress={callMoe} name="check" loading={loading} disabled={!hasChosen} label='Find the name of your anime' />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
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
  imageView: {
    marginVertical: 8,
    width: 'auto',
    height: '70%',
    // borderRadius: 10,
  },
});
