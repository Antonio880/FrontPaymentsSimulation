import React from 'react';
import { View, StyleSheet } from 'react-native';
import TransactionList from '../../components/TransactionList/index'; // Import the TransactionList component

const TransactionHistoryPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <TransactionList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TransactionHistoryPage;
