import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Clipboard, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { createPayment } from '../../services/payments';
import { Payment, PaymentResponse } from '../../types/index';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';

interface PixKeyScreenProps {
  goBack: () => void;
  inputValue: string;
}

enum Submitting {
  IDLE,
  PROCESSING,
  DONE
}

interface PixKeyScreenState {
  pixKey: string;
  qrCode: string;
}

const PixKeyScreen: React.FC<PixKeyScreenProps> = ({ goBack, inputValue }) => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [pixKeyScreen, setPixKeyScreen] = useState<PixKeyScreenState | null>(null);
  const [schedule, setSchedule] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<Submitting>(Submitting.IDLE);
  const pixKeyType = watch('pixKeyType');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if(event.type == "set") {
      console.log("date selected")
    } else {
      console.log("date not selected")
    }
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      console.log("checking platform")
    }
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setValue('date', currentDate);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const onSubmit = (data: Payment) => {
    if (isSubmitting === Submitting.PROCESSING) return;
    setIsSubmitting(Submitting.PROCESSING);

    const payment = {
      pixKey: data.pixKey,
      amount: Number(inputValue.replace(/[^0-9]/g, '')) / 100,
      schedule: date,
      pixKeyType: data.pixKeyType,
    };

    createPayment(payment)
      .then((response: PaymentResponse) => {
        setPixKeyScreen({
          pixKey: response.qr_code, // Propósito trocado
          qrCode: `${response.pix_key}`, // Propósito trocado
        });
        setIsSubmitting(Submitting.DONE);
      })
      .catch(error => {
        console.error(error);
        setIsSubmitting(Submitting.IDLE);
      });
  };

  const renderContent = ({ pixKey, qrCode }: PixKeyScreenState) => {
    const copyToClipboard = () => {
      Clipboard.setString(pixKey);
      Alert.alert('Código copiado para a área de transferência!');
    };

    return (
      <View style={styles.modalView}>
        <Image source={{ uri: qrCode }} style={styles.qrCodeImage} />
        <Text style={styles.pixKeyText}>Código Pix: {pixKey}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyButtonText}>Copiar Código</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backDiv} onPress={goBack}>
          <Text style={styles.back}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isSubmitting === Submitting.DONE && pixKeyScreen ? (
        renderContent(pixKeyScreen)
      ) : (
        <View style={styles.modalView}>
          <Text style={styles.label}>Selecione o Tipo de Chave Pix</Text>
          <Controller
            control={control}
            name="pixKeyType"
            defaultValue="cpf"
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="CPF" value="cpf" />
                <Picker.Item label="CNPJ" value="cnpj" />
                <Picker.Item label="Email" value="email" />
                <Picker.Item label="Telefone" value="telefone" />
                <Picker.Item label="Chave Aleatória" value="aleatoria" />
              </Picker>
            )}
          />
          <Controller
            control={control}
            name="pixKey"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={pixKeyType === 'cpf' ? formatCPF(value) : value}
                onChangeText={(text) => onChange(pixKeyType === 'cpf' ? formatCPF(text) : text)}
                placeholder={`Digite sua chave Pix (${pixKeyType === 'cpf' || pixKeyType === 'cnpj' ? pixKeyType.toUpperCase() : pixKeyType})`}
                keyboardType={pixKeyType === 'telefone' ? 'numeric' : pixKeyType === 'email' ? 'email-address' : pixKeyType === "cpf" ? 'numeric' : 'default'}
                style={styles.textInput}
              />
            )}
          />
          <View style={styles.checkboxContainer}>
            <Text>Agendar Pagamento</Text>
            <TouchableOpacity onPress={() => setSchedule(!schedule)} style={styles.checkbox}>
              <Text>{schedule ? 'Sim' : 'Não'}</Text>
            </TouchableOpacity>
          </View>
          {schedule && (
            <View>
              <Button onPress={() => setShowDatePicker(true)} title="Selecionar Data e Hora" />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <Text>Data Selecionada: {date.toLocaleDateString()}</Text>
            </View>
          )}
          <View >
            <Button title="Pagar" onPress={handleSubmit(onSubmit)} disabled={isSubmitting === Submitting.PROCESSING} />
            <TouchableOpacity style={styles.backDiv} onPress={goBack}>
              <Text style={styles.back}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PixKeyScreen;
