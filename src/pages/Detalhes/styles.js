import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #0f172a;
`;

export const ButtonView = styled.View`
  width: 100%;
  height: 60px;

  flex-direction: row;

  justify-content: space-between;

  padding: 10px;

  margin-top: 30px;
  margin-bottom: 15px;
`;

export const ButtonSignOutView = styled.TouchableOpacity`
  background-color: #000;

  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;

  justify-content: center;
  align-items: center;

  background-color: #000;
`;

export const ImageBackgroundGames = styled.Image`
  width: 100%;
  height: 160px;

  margin-top: 10px;

  border-radius: 12px;

  opacity: 0.5;
`;

export const GenresView = styled.View`
  margin: 10px;
`;

export const GenresButtonPlatform = styled.View`
  height: 40px;
  align-self: flex-start;

  justify-content: center;
  align-items: center;

  border-radius: 8px;

  padding: 5px;

  flex-direction: row;
`;

export const Genres = styled.Text`
  font-size: 16px;
  color: #fff;

  font-weight: bold;
`;
