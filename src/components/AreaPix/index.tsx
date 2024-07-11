import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from '../Button';
import styles from './styles';
import PixKeyScreen from '../PixKeyScreen/index';

interface AreaPixProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function AreaPix({ modalVisible, setModalVisible }: AreaPixProps) {
  const [inputValue, setInputValue] = useState('');
  const [currentScreen, setCurrentScreen] = useState('AreaPix'); // Estado para controlar a tela visível

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(Number(numericValue) / 100);
    setInputValue(formattedValue);
  };

  const renderContent = () => {
    if (currentScreen === 'AreaPix') {
      return (
        <View style={styles.modalView}>
          <Text 
            //style={styles.modalText}
            >Digite o Valor a ser Enviado</Text>
          <View 
            // style={[styles.button, styles.buttonClose]}
            >
            <TextInput
              value={inputValue}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
              placeholder='R$ 0,00'
              // style={styles.textInput}
            />
            <View style={styles.containerButtons}>
              <Button onPress={() => setCurrentScreen('PixKeyScreen')} title='Next' />
              <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textClose}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (currentScreen === 'PixKeyScreen') {
      return <PixKeyScreen goBack={() => setCurrentScreen('AreaPix')} inputValue={inputValue} />;
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {renderContent()}
        </View>
      </Modal>
    </View>
  );
};