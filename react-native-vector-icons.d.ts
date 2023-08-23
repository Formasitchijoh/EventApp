declare module 'react-native-vector-icons/MaterialCommunityIcons' {
    import { Component } from 'react';
    import { StyleProp, TextStyle } from 'react-native';
  
    interface IconProps {
      name: string;
      size?: number;
      color?: string;
      style?: StyleProp<TextStyle>;
    }
  
    export default class MaterialCommunityIcons extends Component<IconProps> {}
  }