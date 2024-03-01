import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

interface TextButtonProps extends TouchableOpacityProps {
  text: string;
}

const TextButton = (props: TextButtonProps) => {
  const {text, ...other} = props;
  return (
    <TouchableOpacity activeOpacity={0.75} style={{padding: 15}} {...other}>
      <View style={styles.textButtonContainer}>
        <Text style={styles.textButtonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textButtonContainer: {
    backgroundColor: '#0FA3B1',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textButtonText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
});

export default TextButton;
