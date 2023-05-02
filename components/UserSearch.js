import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import isEmpty from 'lodash/isEmpty';

import axios from 'axios';

const UserListView = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState('');

  async function onSearch() {
    setUser({});
    setError('');
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
          Origin: 'https://my-react-native-app.com',
        },
        mode: 'cors',
        credentials: 'include',
      });
      setUser(res.data);
    } catch (err) {
      setError('Not found');
    }
  }
  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={username}
        onChangeText={setUserName}
      />
      <Button onPress={onSearch} title="Search" color="#841584" />
      {!isEmpty(user) && (
        <View style={styles.container}>
          <Image source={{uri: user.avatar_url}} style={styles.avatar} />
          <Text style={styles.text}> {user.login}</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.bio}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Followers', {username: user.login})
            }>
            <Text style={styles.followers}>{user.followers} followers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Followings', {username: user.login})
            }>
            <Text style={styles.following}>{user.following} following</Text>
          </TouchableOpacity>
        </View>
      )}
      {!isEmpty(error) && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    fontSize: 18,
  },
  text: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 18,
  },
  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  followers: {
    color: 'darkblue',
    fontSize: 18,
    marginBottom: 2,
  },
  following: {
    color: 'purple',
    fontSize: 18,
    marginBottom: 2,
  },
});

export default UserListView;
