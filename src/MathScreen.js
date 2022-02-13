import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import { StatusBar } from "expo-status-bar";

const DismissNumericKeyboard = ({children}) => {
  return <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
}

const MathScreen = ({ route }) => {
  const { type } = route.params
  const [score, setScore] = useState(0);
  const [open, setOpen] = useState(false)
  const [userNumberInput, setUserNumberInput] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [firstNum, setFirstNum] = useState(999)
  const [secondNum, setSecondNum] = useState(9)
  const [iconName, setIconName] = useState("") 

  useEffect(()=>{
    if (type=="Addition") {
      setIconName("plus")
    } else if (type=="Subtraction") {
      setIconName("minus")
    } else if (type=="Multiplication") {
      setIconName("times")
    } else if (type=="Division") {
      setIconName("divide")
    }
  }, [])

  useEffect(()=>{
    changeNumbers()
  }, [difficulty])

  const getRandomInteger = (max) => {
    return Math.floor(Math.random()*max);
  }

  const changeNumbers = () => {
    if (type == "Subtraction") {
      if (difficulty == "Easy") {
        const secNum = getRandomInteger(10)
        const firstNum = secNum + getRandomInteger(10)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      } else if (difficulty == "Medium") {
        const secNum = getRandomInteger(100)
        const firstNum = secNum + getRandomInteger(100)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      } else if (difficulty == "Hard") {
        const secNum = getRandomInteger(10000)
        const firstNum = secNum + getRandomInteger(10000)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      }
    } else if (type == "Division") {
      if (difficulty == "Easy") {
        const secNum = getRandomInteger(10)
        const firstNum = secNum * getRandomInteger(10)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      } else if (difficulty == "Medium") {
        const secNum = getRandomInteger(100)
        const firstNum = secNum * getRandomInteger(10)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      } else if (difficulty == "Hard") {
        const secNum = getRandomInteger(1000)
        const firstNum = secNum * getRandomInteger(100)
        setFirstNum(firstNum)
        setSecondNum(secNum)
      }
    } else {
      if (difficulty == "Easy") {
        setFirstNum(getRandomInteger(10))
        setSecondNum(getRandomInteger(10))
      } else if (difficulty == "Medium") {
        setFirstNum(getRandomInteger(100))
        setSecondNum(getRandomInteger(100))
      } else if (difficulty == "Hard") {
        setFirstNum(getRandomInteger(10000))
        setSecondNum(getRandomInteger(10000))
      }
    }
  }

  const textInputChange = (str) => {
    setUserNumberInput(str);
    if (type == "Addition") {
      if (str == firstNum + secondNum) {
        setScore(score+1);
        setUserNumberInput("")
        changeNumbers();
      }
    } else if (type == "Subtraction") {
      if (str == firstNum - secondNum) {
        setScore(score+1);
        setUserNumberInput("")
        changeNumbers();
      }
    } else if (type == "Multiplication") {
      if (str == firstNum * secondNum) {
        setScore(score+1);
        setUserNumberInput("")
        changeNumbers();
      }
    } else if (type == "Division") {
      if (str == firstNum / secondNum) {
        setScore(score+1);
        setUserNumberInput("")
        changeNumbers();
      }
    }
  }

  const dropDownChange = (item) => {
    setDifficulty(item)
  }

  return (
    <DismissNumericKeyboard>
      <View style={{flex: 1, backgroundColor:"#0096ff"}}>
      <StatusBar hidden />
          <View style={[styles.section, {alignItems: 'center', justifyContent: 'center'}]}>
            <Text style={{fontSize: 50}}>Score: {score}</Text>
          </View>
          {/* Middle Container */}
          <View style={[styles.section, {flex: 2, justifyContent: 'center', alignItems: 'center'}]}>
            {/* Area for math display */}
            <View style={{width: '70%', height: '80%'}}>
              {/* Area for numbers and symbol */}
              <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center', marginRight: 10}}>
                {/* View for icon */}
                <View style={{width: 50, justifyContent: 'flex-end', alignItems: 'center', margin: 10, paddingBottom: 10}}>
                  <FontAwesome5
                    name={iconName}
                    size={50}
                  />
                </View>
                {/* View for numbers */}
                <View style={{flexDirection: 'column', marginRight: 10, alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                  {/* View for first number */}
                  <View style={{width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={styles.numbers}>{firstNum}</Text>
                  </View>
                  {/* View for second number */}
                  <View style={{borderBottomColor: 'black', borderBottomWidth: 10, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={styles.numbers}>{secondNum}</Text>
                  </View>
                </View>
              </View>
              {/* View for the user's input */}
              <View style={{flex: 1, alignItems: 'flex-end', marginTop: 5}}>
                <TextInput
                  value={userNumberInput}
                  onChangeText={(str)=>textInputChange(str)}
                  keyboardType="numeric"
                  style={{borderBottomWidth: 2, borderColor: '#002', height: 60, fontSize: 40, width: '60%', marginRight: 45, textAlign: 'right'}}
                  
                />
              </View>
            </View>
          </View>
          <View style={[styles.section, {alignItems: 'flex-end', justifyContent: 'flex-end'}]}>
            <DropDownPicker
              items={[{label: "Easy", value: "Easy"}, {label:"Medium", value: "Medium"}, {label: "Hard", value: "Hard"}]}
              open={open}
              onPress={()=>setOpen(!open)}
              onSelectItem={(item)=>{setOpen(!open); dropDownChange(item.value)}}
              placeholder={difficulty ? difficulty : "Select the difficulty"}
            />
          </View>
      </View>
    </DismissNumericKeyboard>
  )
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
  },
  numbers: {
    fontSize: 75,
  }
})

export default MathScreen