import {ActivityIndicator, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Icon} from 'react-native-paper';

interface IconButtonProps extends TouchableOpacityProps {
  iconColor: string;
  loading: boolean;
}

const IconButton = (props: IconButtonProps) => {
  const {iconColor, loading = false, ...other} = props;
  return (
    <TouchableOpacity activeOpacity={0.75} {...other}>
      {loading ? (
        <ActivityIndicator size="large" color={iconColor} />
      ) : (
        <Icon color={iconColor} source="plus" size={50} />
      )}
    </TouchableOpacity>
  );
};

export default IconButton;
