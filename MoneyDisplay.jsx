import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import twenty from './assets/money/20k.png'
import fifty from './assets/money/50k.jpg'
import oneHundred from './assets/money/100k.png'
import twoHundred from './assets/money/200k.png'
import { generateMoney } from './utils';

const MoneyDisplay = ({ setIsOpen }) => {
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const onPress = () => {
    setIsOpen(false)
  }

  const handleSources = () => {
    const money = generateMoney();
    switch (money) {
      case '50.000':
        return fifty;
      case '100.000':
        return oneHundred;
      case '200.000':
        return twoHundred;
      case '20.000':
        return twenty;
      default:
        return fifty
    }
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/congrats.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Image
            style={styles.money}
            source={handleSources()}
          />
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  },
  button: {
    width: 450,
    height: 200,
  },
  money: {
    width: '100%',
    height: '100%'
  }
})

export default MoneyDisplay;