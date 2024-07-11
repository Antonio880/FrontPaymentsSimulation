import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import TransactionItem from '../TransactionItem/index';
import { getTransactionHistory } from '../../services/payments';
import styles from './styles';
import { Transaction } from '../../types/index';
import { Picker } from '@react-native-picker/picker';

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactionHistory(status);
      setTransactions(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    console.log(status)
    fetchTransactions();
  }, [status]);

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={status}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue: StringConstructor) => setStatus(itemValue)}>
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Completed" value="completed" />
      </Picker>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionItem
            id={item.id}
            pixKey={item.pixKey}
            amount={item.amount}
            status={item.status}
            createdAt={item.createdAt}
            pixKeyType={item.pixKeyType}
            scheduledAt={item.scheduledAt}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TransactionList;
