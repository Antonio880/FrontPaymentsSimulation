import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, FlatList } from 'react-native';
import styles from './styles';  
import Transaction from '../../types/transaction';

const TransactionSearch = () => {
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      // Substitua esta URL pela URL da sua API
      const response = await fetch(`https://sua-api.com/transactions?pix_key=${pixKey}&amount=${amount}&status=${status}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTransaction = ({ item }: Transaction) => (
    <View style={styles.transaction}>
      <Text>ID: {item.id}</Text>
      <Text>Chave PIX: {item.pixKey}</Text>
      <Text>Valor: {item.amount}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Data de Criação: {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chave PIX:</Text>
      <TextInput
        style={styles.input}
        value={pixKey}
        onChangeText={setPixKey}
        placeholder="Digite a chave PIX"
      />
      
      <Text style={styles.label}>Valor do Pagamento:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Digite o valor do pagamento"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Selecione o status" value="" />
        <Picker.Item label="Completed" value="completed" />
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Failed" value="failed" />
      </Picker>

      <Button title="Buscar" onPress={fetchTransactions} disabled={loading} />
      
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default TransactionSearch;
