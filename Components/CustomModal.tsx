import React, { useState, ReactNode } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { styleGuide } from "../styles/guide";

export default function CustomModal({ children }: { children: ReactNode }) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: styleGuide.color.blue["300"],
  },
  textStyle: {
    color: styleGuide.color.white,
    ...styleGuide.text.heading["4"],
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: styleGuide.color.white,
    ...styleGuide.text.heading["4"],
  },
});
