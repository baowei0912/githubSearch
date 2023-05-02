import React, {useState, useEffect} from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import UserCard from './UserCard';

const FollowersProfile = props => {
  const [followers, setFollowers] = useState([]);
  const {username} = props.route.params;

  useEffect(() => {
    if (username == '') {
      setFollowers([]);
      return;
    }
    fetchFollowers(username);
  }, []);

  function fetchFollowers(username) {
    fetch(`https://api.github.com/users/${username}/followers`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        Origin: 'https://my-react-native-app.com',
      },
      mode: 'cors',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setFollowers(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      {followers !== undefined &&
        followers.map(item => {
          return <UserCard key={item.id} user={item} onClick={()=>Linking.openURL(item.html_url)} />;
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    fontSize: 30,
  }
});

export default FollowersProfile;
