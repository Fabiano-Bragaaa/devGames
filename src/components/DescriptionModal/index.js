import {ScrollView, Text, View} from 'react-native';
import {Container} from './styles';
import {Title} from '../ImageBackground/styles';
import {ButtonSignOutView, ButtonView} from '../../pages/Detalhes/styles';

import Icon from 'react-native-vector-icons/Feather';
import {DescriptionText} from '../Description/styles';

export function DescriptionModal({text, modal}) {
  function closeModal() {
    modal();
  }

  return (
    <Container>
      <ButtonView
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <ButtonSignOutView onPress={closeModal} style={{marginRight: 90}}>
          <Icon name="arrow-left" color={'#fff'} size={24} />
        </ButtonSignOutView>
        <View>
          <Title style={{fontSize: 25, fontWeight: 'bold'}}>Description</Title>
        </View>
      </ButtonView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DescriptionText> {text} </DescriptionText>
        </ScrollView>
      </View>
    </Container>
  );
}
