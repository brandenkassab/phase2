import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback, Image
} from "react-native";
import React from "react";

export const Main = ({ navigation }) => {
  const moveToList = () => {
    navigation.navigate("AlarmsList");
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("rgba(255,255,255,1)", true)}
        onPress={() => moveToList()}
        style={{
          width: 100,
          height: 100,
        }}
      >
        <View style={{ width: "100%", height: 200, background: "red" }}>
        
          <Text style={{ fontSize: 60, textAlign: "center" }}>
            OU Alarm <Image source={{uri: 'https://static.vecteezy.com/system/resources/previews/007/945/481/original/alarm-light-siren-solid-line-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg'}}  
       style={{width: 80, height: 80, justifyContent: "center"}} />  
          </Text>
        </View>
      </TouchableNativeFeedback>
      <Image source={{uri: 'https://images.squarespace-cdn.com/content/v1/5c9fda76aadd343de55159f8/1593630194905-5JRL796DIZGMXICA3MAD/CLOCKonWhite.gif?format=1000w'}}  
       style={{width: 100, height: 100, justifyContent: "center"}} />  
      <Text style={styles.smallText}> Swipe Right</Text>
      <Text style={styles.smallText}>Database is For Personal</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  smallText: {
    fontSize: 17,
    marginRight: 10,
  },
});

