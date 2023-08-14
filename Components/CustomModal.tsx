import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { styleGuide } from "../styles/guide";
import { CustomModalProps } from "../types/props";

export default function CustomModal({ children, onClose }: CustomModalProps) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        if (onClose) {
          onClose();
        }
      }}
    >
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <TouchableOpacity
              hitSlop={20}
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                if (onClose) {
                  onClose();
                }
              }}
            >
              <Text style={styles.textStyle}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
