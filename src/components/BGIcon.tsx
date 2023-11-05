import {StyleSheet, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, SPACING} from '../theme/theme';

interface BGIconProps {
  BGColor: string;
  name: string;
  color: string;
  size: number;
}
const BGIcon: React.FC<BGIconProps> = ({BGColor, name, color, size}) => {
  return (
    <View
      style={[
        styles.IconBG,
        {
          backgroundColor: BGColor,
        },
      ]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
