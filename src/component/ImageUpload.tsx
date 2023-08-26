// import React, { useEffect } from 'react';
// import { View, Button,TouchableOpacity } from 'react-native';

// import { utils } from '@react-native-firebase/app';
// import storage from '@react-native-firebase/storage';
// // import image from '../resources/img.jpg'
// export const ImageUpload =()=> {
//   // create bucket storage reference to not yet existing image
//   const reference = storage().ref('img.jpg');

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={async () => {
//           // path to existing file on filesystem
//           const pathToFile = '../resources/img.jpg';
//           // uploads file
//           await reference.putFile(pathToFile);
//         }}
//       />
//     </View>
//   );
// }