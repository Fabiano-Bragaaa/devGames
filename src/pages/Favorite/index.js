import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  Text,
} from 'react-native';
import {Container, Header, Title, ViewTrash} from './styles';

import Icon from 'react-native-vector-icons/Feather';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Favorite() {
  const navigation = useNavigation();
  const [savedGames, setSavedGames] = useState([]); // Estado para armazenar os jogos salvos
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o indicador de carregamento
  const isFocused = useIsFocused(); // Hook para verificar se a tela está focada

  // Função para carregar os jogos salvos do AsyncStorage
  async function loadSavedGames() {
    try {
      // Busca os detalhes dos jogos salvos no AsyncStorage
      const storedDetails = await AsyncStorage.getItem('gameDetails');
      // Converte os detalhes de string JSON para um array
      const savedGameDetails = storedDetails ? JSON.parse(storedDetails) : [];
      // Define os jogos salvos no estado e desativa o indicador de carregamento
      setSavedGames(savedGameDetails);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes do jogo:', error);
      setIsLoading(false);
    }
  }

  // Função para remover um jogo da lista de favoritos
  async function removeGame(index) {
    try {
      // Cria uma cópia dos jogos salvos
      const updatedGames = [...savedGames];
      // Remove o jogo pelo índice especificado
      updatedGames.splice(index, 1);
      // Atualiza o AsyncStorage com os jogos atualizados
      await AsyncStorage.setItem('gameDetails', JSON.stringify(updatedGames));
      // Atualiza o estado com os jogos salvos atualizados
      setSavedGames(updatedGames);
      // Exibe um alerta de sucesso ao remover o jogo
      Alert.alert('Success', 'Game removed from favorites.');
    } catch (error) {
      console.error('Erro ao remover jogo:', error);
    }
  }

  // Efeito para carregar os jogos salvos quando a tela estiver focada
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true); // Ativa o indicador de carregamento
      loadSavedGames(); // Carrega os jogos salvos
    }
  }, [isFocused]);

  // Se ainda estiver carregando os jogos, exibe um indicador de carregamento
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={30} color={'#fff'} />
      </View>
    );
  }

  // Renderiza a tela de favoritos com a lista de jogos salvos
  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <Icon name="arrow-left" color={'#fff'} size={24} />
        </TouchableOpacity>
        <Title>My Favorites</Title>
      </Header>

      <ScrollView>
        {savedGames.length > 0 ? (
          savedGames.map((game, index) => (
            <View key={index} style={{marginBottom: 20}}>
              <Image
                source={{uri: game.background_image}}
                style={{
                  width: '100%',
                  height: 160,
                  marginTop: 10,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => removeGame(index)}
                style={{position: 'absolute', right: 10, top: 10}}>
                <ViewTrash>
                  <Icon name="trash" size={20} color={'#fff'} />
                </ViewTrash>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 18}}>No saved games</Text>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
