import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  margin: 0px 5px;
  border-width: 1px;
  border-color: #dddddd;
  border-radius: 10px;
  width: 40%;
  height: 50px;
`;

const pickerStyle = {
  inputIOS: {
    color: '#3f3e3c',
    paddingTop: 14,
    paddingHorizontal: 15,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: '#3f3e3c',
  },
  underline: { borderTopWidth: 0 },
};

const PickerIcon = styled.View`
  position: absolute;
  background-color: transparent;
  border-top-width: 7px;
  border-top-color: gray;
  border-right-width: 7px;
  border-right-color: transparent;
  border-left-width: 7px;
  border-left-color: transparent;
  width: 0px;
  height: 0px;
  top: ${Platform.OS === 'ios' ? 19 : 21}px;
  right: 15px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const yearItem = [
  { label: '2020년', value: '2020' },
  { label: '2021년', value: '2021' },
  { label: '2022년', value: '2022' },
  { label: '2023년', value: '2023' },
  { label: '2024년', value: '2024' },
  { label: '2025년', value: '2025' },
  { label: '2026년', value: '2026' },
  { label: '2027년', value: '2027' },
  { label: '2028년', value: '2028' },
  { label: '2029년', value: '2029' },
];

const monthItem = [
  { label: '1월', value: '01' },
  { label: '2월', value: '02' },
  { label: '3월', value: '03' },
  { label: '4월', value: '04' },
  { label: '5월', value: '05' },
  { label: '6월', value: '06' },
  { label: '7월', value: '07' },
  { label: '8월', value: '08' },
  { label: '9월', value: '09' },
  { label: '10월', value: '10' },
  { label: '11월', value: '11' },
  { label: '12월', value: '12' },
];

const SelectDate = ({ type, value, handlePickerChange }) => {
  return (
    <Container>
      <RNPickerSelect
        value={value[type]}
        placeholder={{}}
        style={pickerStyle}
        Icon={() => {
          return <PickerIcon />;
        }}
        onValueChange={(value) => {
          handlePickerChange(type, value);
        }}
        items={type === 'year' ? yearItem : monthItem}
      />
    </Container>
  );
};

export default SelectDate;
