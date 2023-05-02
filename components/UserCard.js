import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const UserCard = ({user, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
    <View style={styles.container}>
      <Image source={{uri: user.avatar_url}} style={styles.avatar} />
      <Text> {user.login}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding:5
  },
  avatar: {
    width: 20,
    height:20,
    borderRadius: 5,
  },
});

export default UserCard;
