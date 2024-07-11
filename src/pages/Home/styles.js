import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #050b18;
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;

  align-items: center;

  padding: 10px;

  margin-top: 10px;
  margin-bottom: 15px;
`;

export const Title = styled.Text`
  color: #fff;

  font-size: 26px;

  font-weight: bold;

  flex: 1;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;

  background-color: #1f2430;
`;

export const InputView = styled.View`
  padding: 10px;

  width: 100%;

  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.TextInput`
  background-color: #1f2430;

  width: 90%;

  height: 40px;

  border-radius: 15px;

  justify-content: center;
  align-items: center;

  padding: 10px;

  font-size: 15px;

  color: #fff;
`;

export const ViewList = styled.View`
  margin-left: 10px;
  margin-right: 10px;

  margin-top: 15px;
  /* 
    flex: 1; */
`;

export const ListCategory = styled.FlatList``;

export const TitleList = styled.Text`
  color: #fff;

  font-size: 17px;

  font-weight: bold;

  margin-bottom: 20px;
`;

export const List = styled.FlatList`
  width: 100%;
  height: 100%;
`;
