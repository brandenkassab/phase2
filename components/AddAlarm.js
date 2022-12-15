import { StyleSheet, Text, View, TouchableNativeFeedback, TextInput,ImageBackground } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Database } from "../api/Database";





export const AddAlarm = ({ route, navigation }) => {
  const { alarmListState, setAlarmListState, newRecord, setNewRecord } =
    route.params;

  const addToDb = (objToAdd) => {
    console.log("dodaje");
    console.log(objToAdd);
    console.log(objToAdd.hour);
    console.log(objToAdd.minute);
    Database.add(objToAdd.hour, objToAdd.minute, objToAdd.turned);
  };
  const addAlarmFunc = () => {
    navigation.navigate("AlarmsList");
    let objToAdd = {
      id: alarmListState.length + 1,
      hour: "00",
      minute: "00",
      turned: false,
    };
    
    setNewRecord(() => !newRecord);
    addToDb(objToAdd);
  };

  const plusIcon = (
    <Icon name="plus-circle" size={80} color="#00FF00" onPress={addAlarmFunc} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.infoTextContainer}>
        <TextInput style={styles.infoText}
        placeholder="+ To Add Alarm Click Here For Notes"/>
      </View>

      <View style={styles.iconContainer}>
        <Text>{plusIcon}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    ImageBackground: "assets/CLOCKonWhite.gif",
  },
  infoTextContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },


  
});
