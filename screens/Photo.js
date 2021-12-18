//CREATED BY SWASTIK POOJARI

import React from 'react'
import { View,StyleSheet,Text } from 'react-native'

export default function Photo() {
    return (
      <View style={styles.container}>
        <Text>Photo</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})

