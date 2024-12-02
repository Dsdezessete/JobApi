import styled from "styled-components/native";
import { TouchableOpacity, Text, View } from "react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 108px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  flex-direction: row;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: #f4f4f4;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Title = styled(Text)`
  font-size: 20px;
  color: #0066ff;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

export const BodyText = styled(Text)`
  font-size: 18px;
  color: #0066ff;
  opacity: 0.8;
`;

export const ViewFlexColumn = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ViewFlexRow = styled(View)`
  align-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SecondaryText = styled(Text)`
  font-size: 16px;
  color: #666666;
  font-weight: 300;
`;

export const IconContainer = styled(View)`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
