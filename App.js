import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [click,setClick]=useState(false)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async (sourceType) => {
    setClick(true)
    let result;
    if (sourceType === 'library') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setClick(false)
    } else if (sourceType === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setClick(false)
    }else if (sourceType === 'supprimer') {
      
      setSelectedImage(null)
    }

    console.log(result.assets[0].uri);
    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // useEffect(() => {
  //   const data = {"assets":[{"assetId":null,"base64":null,"duration":null,"exif":null,"fileName":null,"filesize":null,"height":540,"mimeType":"image/jpeg","rotation":null,"type":"image","uri":"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FMyImagePickerApp-6019c6c7-6d7d-4f86-8e61-7be628748556/ImagePicker/463b7a64-2740-4e88-9e03-f58dac20e431.jpeg","width":720}],"canceled":false};
  //   if (data.assets && !data.canceled) {
  //     setSelectedImage(data.assets[0].uri);
  //   }
  // }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center',marginTop:200}}>
      {selectedImage && (
        <View style={{ marginBottom: 20 }}>
          <Image source={{ uri: selectedImage }} style={{ width: 350, height: 200 }} />
        </View>
      )}
      {!selectedImage && (
        <View style={{ marginBottom: 20,backgroundColor:'#414142', width: 350, height: 200,justifyContent:'center' ,alignItems:'center' }}>
             <Text style={{fontSize:15, color:'#cacacc',fontWeight:'800' }}>Désolé, aucune image sélectionnée</Text>
        </View>
      )}
      <View style={{ flexDirection:'row' ,marginTop:50}}>
        <TouchableOpacity style={{ margin:10,backgroundColor:'#17181a', width: 170, height: 50,justifyContent:'center' ,alignItems:'center' ,borderRadius:10}} 
        onPress={() => pickImage('library')} >
          <Text style={{ color:'white' ,fontWeight:'700'}}>Choisissez une image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin:10,backgroundColor:'#17181a', width: 170, height: 50,justifyContent:'center' ,alignItems:'center' ,borderRadius:10}} 
        onPress={() => pickImage('camera')} >
          <Text style={{ color:'white' ,fontWeight:'700'}}>Ouvrir l'appareil photo</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity style={{ margin:10,backgroundColor:'#4f0d09', width: 170, height: 50,justifyContent:'center' ,alignItems:'center' ,borderRadius:10,marginTop:20}} 
        onPress={() => pickImage('supprimer')} >
          <Text style={{ color:'white' ,fontWeight:'700'}}>Supprimer</Text>
        </TouchableOpacity>
    </View>
  );
}
