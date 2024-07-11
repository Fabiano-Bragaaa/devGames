import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {api} from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';
import PagerView from 'react-native-pager-view';

import {
  Container,
  ButtonView,
  ButtonSignOutView,
  SaveButton,
  GenresView,
  TitleGenres,
  GenresButtonPlatform,
  Genres,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SubText,
  SubViewText,
  Title,
} from '../../components/ImageBackground/styles';
import {Star, Check} from 'phosphor-react-native';
import {Description} from '../../components/Description';
import {DescriptionModal} from '../../components/DescriptionModal';
import {Modal} from 'react-native';

export function Detalhes() {
  const [details, setDetails] = useState({});
  const [category, setCategory] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [store, setStore] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const route = useRoute();
  const {gameName} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    async function loadingDetalhes() {
      try {
        const response = await api.get(
          `games/${gameName}?key=d22198479fd144bcb2462c4d8e011db2`,
        );
        setDetails(response.data);
        setCategory(response.data.genres);
        const platformsArray = response.data.platforms
          ? response.data.platforms.map(p => p.platform.name)
          : [];
        setPlatforms(platformsArray);
        const storeformsArray = response.data.stores
          ? response.data.stores.map(p => p.store.name)
          : [];
        setStore(storeformsArray);

        // Verifica se o jogo já está salvo nos favoritos
        const storedDetails = await AsyncStorage.getItem('gameDetails');
        const savedGameDetails = storedDetails ? JSON.parse(storedDetails) : [];
        const gameExists = savedGameDetails.some(
          game => game.id === response.data.id,
        );

        setIsSaved(gameExists);
      } catch (err) {
        console.log(err);
      }
    }

    loadingDetalhes();
  }, [gameName]);

  function openModal() {
    setVisible(!visible);
  }

  async function saveToStorage(gameDetails) {
    try {
      const storedDetails = await AsyncStorage.getItem('gameDetails');
      let savedGameDetails = storedDetails ? JSON.parse(storedDetails) : [];

      if (!Array.isArray(savedGameDetails)) {
        savedGameDetails = [];
      }

      // Verifica se o jogo já existe na lista
      const gameExists = savedGameDetails.some(
        game => game.id === gameDetails.id,
      );

      if (!gameExists) {
        // Adiciona o novo jogo aos detalhes existentes
        savedGameDetails.push(gameDetails);
        await AsyncStorage.setItem(
          'gameDetails',
          JSON.stringify(savedGameDetails),
        );
        console.log('Detalhes do jogo salvos no AsyncStorage.');
        setIsSaved(true);
      } else {
        console.log('O jogo já está salvo nos favoritos.');
      }

      navigation.navigate('Favorite', {updated: true});
    } catch (error) {
      console.error('Erro ao salvar detalhes do jogo:', error);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#050B18'}}>
      <Container showsHorizontalScrollIndicator={false}>
        <ButtonView style={{position: 'absolute', zIndex: 1}}>
          <ButtonSignOutView onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" color={'#fff'} size={24} />
          </ButtonSignOutView>
          <SaveButton onPress={() => saveToStorage(details)}>
            {isSaved ? (
              <Check color="#fff" size={24} />
            ) : (
              <Icon name="bookmark" size={24} color={'#fff'} />
            )}
          </SaveButton>
        </ButtonView>

        {details.background_image ? (
          <PagerView initialPage={0}>
            <Image
              style={{width: '100%', height: 200}}
              source={{uri: details.background_image}}
              key={1}
            />
            {details.background_image_additional && (
              <Image
                style={{width: '100%', height: 200}}
                source={{uri: details.background_image_additional}}
                key={2}
              />
            )}
          </PagerView>
        ) : (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={30} color={'#fff'} />
          </View>
        )}

        <View style={{padding: 10}}>
          <SubViewText style={{marginTop: 25}}>
            <Star color="orange" weight="fill" size={15} />
            <SubText> {details.rating} / 5</SubText>
          </SubViewText>
          <Title style={{fontSize: 20, marginTop: 5}}>{details.name}</Title>
        </View>

        <GenresView>
          <Title style={{fontSize: 20, marginBottom: 15, marginLeft: 10}}>
            Genres
          </Title>
          <GenresButtonPlatform>
            {category.map((genre, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#64748b',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  marginLeft: 5,
                  borderRadius: 20,
                  height: 35,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </GenresButtonPlatform>
        </GenresView>

        <View style={{padding: 10}}>
          <Title style={{fontSize: 20, marginBottom: 15, marginLeft: 10}}>
            Platforms
          </Title>
          <ScrollView horizontal>
            {platforms.map((platform, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#1F2430',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  borderRadius: 20,
                }}>
                <Text style={{color: '#fff'}}>{platform}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {details.description_raw === undefined || null ? (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={30} color={'#fff'} />
          </View>
        ) : (
          <View>
            <Title style={{fontSize: 20, marginBottom: 15, marginLeft: 10}}>
              Description
            </Title>
            <Description
              text={details.description_raw}
              maxLength={300}
              modal={openModal}
            />
          </View>
        )}

        <View style={{padding: 10}}>
          <Title style={{fontSize: 20, marginBottom: 15, marginLeft: 10}}>
            Stores
          </Title>
          <ScrollView horizontal>
            {store.map((store, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#1F2430',
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  marginRight: 8,
                  borderRadius: 20,
                }}>
                <Text style={{color: '#fff'}}>{store}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <Modal visible={visible} animationType="slide" transparent>
          <DescriptionModal text={details.description_raw} modal={openModal} />
        </Modal>
      </Container>
    </SafeAreaView>
  );
}
