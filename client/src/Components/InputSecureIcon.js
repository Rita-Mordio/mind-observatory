import {TouchableOpacity,} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

const InputSecureIcon = ({ handleSecureTextEntryChange, isSecureTextEntry }) => {
    return(
        <TouchableOpacity
            onPress={() => {
                handleSecureTextEntryChange('confirmSecureTextEntry');
            }}>
            {isSecureTextEntry ? (
                <FeatherIcon name="eye-off" color="gray" size={20} />
            ) : (
                <FeatherIcon name="eye" color="gray" size={20} />
            )}
        </TouchableOpacity>
    )
}

export default InputSecureIcon