import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { Transaction } from '../../types/index';
import styles from './styles';

export default function TransactionItem({ id, pixKey, amount, status, createdAt, pixKeyType, scheduledAt }: Transaction)  {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Chave Pix:</Text>
        <Text style={styles.value}>{pixKey} </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>R$ {amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Data de Criação:</Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>
      {status === "pending" && (
        <View style={styles.row}>
          <Text style={styles.label}>Data Agendada:</Text>
          <Text style={styles.value}>{new Date(scheduledAt).toLocaleString()}</Text>
        </View>
      )}
    </View>
  );
};

