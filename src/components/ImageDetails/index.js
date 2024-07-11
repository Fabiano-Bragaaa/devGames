import React from 'react';
import {Text, View} from 'react-native';
import {Container, ImageDetailsGame} from './styles';

export default function ImageDetails({data}) {
  console.log(data); // Para verificar se os dados estão sendo passados corretamente
  return (
    <Container>
      <ImageDetailsGame source={{uri: data.background_image}} />
      {/* Certifique-se de que a imagem está sendo renderizada corretamente */}
      <Text>{data.name}</Text>
      {/* Adiciona um texto para verificar se os dados do jogo estão sendo passados corretamente */}
    </Container>
  );
}
