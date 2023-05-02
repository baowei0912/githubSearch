import React, { useEffect } from 'react';
import { Linking } from 'react-native';

const OpenUrlScreen = ({ route, navigation }) => {
  useEffect(() => {
    const { url } = route.params;
    Linking.openURL(url);
    navigation.goBack();
  }, []);

  return null;
};

export default OpenUrlScreen;
