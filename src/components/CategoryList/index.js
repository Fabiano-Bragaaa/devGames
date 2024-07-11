import {Text, TouchableOpacity} from 'react-native';
import {Container, Button, ButtonTitle} from './styles';

export function CategoryList({data, onPress}) {
  return (
    <Container>
      <Button onPress={onPress}>
        <ButtonTitle numberOfLines={1}>{data.name}</ButtonTitle>
      </Button>
    </Container>
  );
}
