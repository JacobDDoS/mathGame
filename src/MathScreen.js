import React from 'react'
import { View, Text } from 'react-native'
const MathScreen = ({ route }) => {
  const { type } = route.params
  return (
    <View>
        <Text>{type}</Text>
    </View>
  )
}

export default MathScreen