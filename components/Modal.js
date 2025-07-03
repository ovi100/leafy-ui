import React from 'react';
import {
  Dimensions,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonClose from './ButtonClose';
const {height, width} = Dimensions.get('window');

const demoContent = {color: 'black', padding: 16, textAlign: 'center'};

const Modal = ({
  isOpen = false,
  showCloseButton = true,
  closeIcon = null,
  header = '',
  onPress = null,
  children = (
    <Text style={demoContent}>
      This is modal children and it can be anything Ex: Text, View.......
    </Text>
  ),
}) => {
  const getDynamicWidth = () => {
    return {
      width: width > 480 ? '95%' : '100%',
    };
  };

  const getDynamicHeaderText = () => {
    return {
      marginLeft: closeIcon ? 15 : 0,
    };
  };

  const getContentStyles = () => {
    return {
      marginTop: header ? 10 : 0,
    };
  };

  return (
    <RNModal visible={isOpen} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={[styles.modal, getDynamicWidth()]}>
          {header && (
            <View style={styles.modalHeader}>
              <Text style={[styles.headerText, getDynamicHeaderText()]}>
                {header}
              </Text>
              {showCloseButton && (
                <>
                  {closeIcon ? (
                    <TouchableOpacity onPress={onPress}>
                      {closeIcon}
                    </TouchableOpacity>
                  ) : (
                    <ButtonClose onPress={onPress} />
                  )}
                </>
              )}
            </View>
          )}
          <View style={getContentStyles()}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    padding: width > 480 ? 15 : 10,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 15,
    maxHeight: height > 570 ? height * 0.95 : height,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
});
