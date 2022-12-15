import {
  StyleSheet,
  Text,
  View,
  Switch,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { LogBox } from "react-native";
import { Animated } from "react-native";
import { Database } from "../api/Database";

const ArrowUpIcon = (
  <Icon.Button
    name="ios-arrow-up-circle-outline"
    size={30}
    color="#0D4C92"
    backgroundColor="#CFF5E7"
  />
);
const windowHeight = Dimensions.get("window").height;



const Item = ({ item, backgroundColor, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.weekDayContainer, backgroundColor]}>
      <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const ListItem = ({ id, hour, minute, deleteFromList }) => {
  
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const weekDays = [
    { name: "M", id: 1 },
    { name: "T", id: 2 },
    { name: "W", id: 3 },
    { name: "T", id: 4 },
    { name: "F", id: 5 },
    { name: "S", id: 6 },
    { name: "S", id: 7 },
  ];

  const heightAnim = useRef(new Animated.Value(windowHeight / 4)).current;
  const [isRolled, setIsRolled] = useState(false);
  const [isWeekSelected, setIsWeekSelected] = useState();
  const [selectedId, setSelectedId] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  
  const heightIn = () => {
    
    setIsRolled(true);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 6,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const heightOut = () => {
    setIsRolled(false);
    Animated.timing(heightAnim, {
      toValue: windowHeight / 4,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const heightToggle = () => {
    isRolled ? heightOut() : heightIn();
   
  };

  const deleteFromDb = () => {
    console.log("usuwam z bazy");
    Database.remove(id);
    deleteFromList(id);
    
  };

  
  const ArrowDownIcon = (
    <Icon.Button
      name="ios-arrow-down-circle-outline"
      size={30}
      color="#71C9CE"
      backgroundColor="#E3FDFD"
      onPress={heightToggle}
    />
  );

  const TrashIcon = (
    <Icon.Button
      backgroundColor="#E3FDFD"
      name="ios-trash-bin"
      size={30}
      color="#71C9CE"
      onPress={deleteFromDb}
    />
  ); 

  const renderItem = ({ item }) => {
    let backgroundColor = "";
   

    if (selectedId.includes(item.id)) {
      backgroundColor = "#71C9CE";
    } else backgroundColor = "#CBF1F5";

    

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedId.includes(item.id)) {
            setSelectedId(selectedId.filter((id) => id != item.id));
          } else {
            setSelectedId((prevArr) => {
              return [item.id, ...prevArr];
            });
          }
        }}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

 
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: heightAnim,
        },
      ]}
    >
      <View style={styles.topContainer}>
        <TextInput placeholder=":" style={{ fontSize: 45 }}>
          {hour.padStart(0,"2")}:{minute.padStart(0,"2")}
        </TextInput>
        <Switch
          trackColor={{ false: "#767577", true: "#A6E3E9" }}
          thumbColor={"#71C9CE"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        ></Switch>
      </View>
      <View style={styles.bottomContainer}>
        <Text> {TrashIcon} </Text>
        <Text> {ArrowDownIcon}</Text>
      </View>
      <View>
        <FlatList
          data={weekDays}
          horizontal={true}
          
          renderItem={renderItem}
          extraData={selectedId}
        />
       
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          width: "80%",
          alignSelf: "center",
          justifySelf: "center",
        }}
      />
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
   
    justifyContent: "space-between",
    marginBottom: 30,
    overflow: "hidden",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
   
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  weekDayContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    borderRadius: 25 / 2,
    marginHorizontal: 3,
    borderWidth: 1,
  },
});
