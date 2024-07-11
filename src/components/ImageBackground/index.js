import {View} from 'react-native';

import {
  ImageBackgroundGames,
  ButtonImage,
  ViewTitle,
  Title,
  SubViewText,
  SubText,
} from './styles';

import {useNavigation} from '@react-navigation/native';

import {Star} from 'phosphor-react-native';

export function ImageBackground({data}) {
  const navigation = useNavigation();
  return (
    <ButtonImage
      onPress={() =>
        navigation.navigate('Detalhes', {
          gameName: data.slug,
          platform: data.platforms[0].platform.name,
          id: data.id,
        })
      }>
      <ImageBackgroundGames source={{uri: data.background_image}} />
      <ViewTitle>
        <Title> {data.name} </Title>
        <SubViewText>
          <Star color="orange" weight="fill" size={15} />

          <SubText> {data.rating} </SubText>
        </SubViewText>
      </ViewTitle>
    </ButtonImage>
  );
}
