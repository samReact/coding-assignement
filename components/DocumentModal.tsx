import { StyleSheet,Pressable, Text, View, Modal } from 'react-native';
import React, { ReactElement, useState } from "react";

type Props = {
  document: {
    title: string
    description: string
    updatedAt: string
    createdAt: string
  }
}

export default function DocumentModal(props: Props):ReactElement {
  const [modalVisible, setModalVisible] = useState(false);
  const {title,description,updatedAt,createdAt} = props.document


    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              <Text style={styles.modalText}>{description}</Text>
              <Text style={styles.modalText}>{updatedAt}</Text>
              <Text style={styles.modalText}>{createdAt}</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={styles.item}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>{title}</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

