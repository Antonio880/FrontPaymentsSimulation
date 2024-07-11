import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 280,
    width: 400,
    marginTop: 200,
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modalView: {
  backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  qrCodeImage: {
    marginLeft: 60,
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  pixKeyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  copyButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  copyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  back: {
    fontSize: 16,
    color: 'black',
  },
});
