import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      padding: 15,
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    label: {
      fontWeight: 'bold',
      color: '#333',
    },
    value: {
      color: '#555',
    },
  });
  