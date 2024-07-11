import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #050b18;
`;

export const Header = styled.View`
  flex-direction: row;
  height: 60px;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 110px;
`;

export const List = styled.FlatList`
  flex: 1;
`;

export const ViewTrash = styled.View`
  width: 40px;
  height: 40px;

  background-color: #f00000;

  border-radius: 20px;

  justify-content: center;

  align-items: center;

  position: absolute;

  top: 10%;

  right: 5%;
`;
