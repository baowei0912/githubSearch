import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import UserCard from './UserCard';

const FollowingsProfile = props => {
  const [followings, setFollowings] = useState([]);
  const {username} = props.route.params;

  useEffect(() => {
    if (username == '') {
        setFollowings([]);
      return;
    }
    fetchFollowers(username);
  }, []);

  function fetchFollowers(username) {
    fetch(`https://api.github.com/users/${username}/following`, {
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
        setFollowings(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  const handleOpenUrl = (url) => {
    navigation.navigate('OpenUrl', { url: `${url}` });
  };

  return (
    <View style={styles.container}>
      {followings !== undefined &&
        followings.map(item => {
          return <UserCard key={item.id} user={item} onClick={()=>handleOpenUrl(item.html_url)} />;
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

export default FollowingsProfile;
