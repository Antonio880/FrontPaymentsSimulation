// screens/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import { useState } from 'react';
import AreaPix from '../../components/AreaPix';

interface HomeScreenProps {
    
}

export default function HomeScreen({ }: HomeScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.homeScreen}>
        <Text>Home Screen</Text>
        <Button onPress={() => setModalVisible(true)} title='Pix' />
      </View>
      <AreaPix modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};


