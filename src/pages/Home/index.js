import {Text, View, ActivityIndicator} from 'react-native';
import {
  Container,
  Header,
  Title,
  SaveButton,
  InputView,
  Input,
  ViewList,
  TitleList,
  List,
  ListCategory,
} from './styles';

import {api} from '../../services/api';
import {CategoryList} from '../../components/CategoryList';
import {ImageBackground} from '../../components/ImageBackground';

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect, useCallback} from 'react';

export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchGames, setSearchGames] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadGames = useCallback(async () => {
    try {
      const response = await api.get(
        'games?page_size=10&key=9516ca4b6d1e4fd7afbb31b4d3ccdc36',
      );
      setGames(response.data.results);
      setFilteredGames(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log('Erro ao buscar os jogos:', error);
      setLoading(false);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      const response = await api.get(
        'genres?key=9516ca4b6d1e4fd7afbb31b4d3ccdc36',
      );
      setCategory(response.data.results);
    } catch (error) {
      console.log('Erro ao buscar as categorias:', error);
    }
  }, []);

  useEffect(() => {
    loadGames();
    loadCategories();
  }, [loadGames, loadCategories]);

  useEffect(() => {
    async function searchGamesAPI() {
      if (searchGames.length > 0) {
        const response = await api
          .get(
            `games?search=${searchGames}&key=9516ca4b6d1e4fd7afbb31b4d3ccdc36`,
          )
          .then(r => {
            setFilteredGames(r.data.results);
          })
          .catch(error => {
            console.log('Erro ao buscar os jogos:', error);
          });
      } else {
        setFilteredGames(games);
      }
    }

    searchGamesAPI();
  }, [searchGames, games]);

  useEffect(() => {
    if (selectedCategory) {
      const categoryGames = games.filter(game =>
        game.genres.some(genre => genre.name === selectedCategory),
      );
      setFilteredGames(categoryGames);
    } else {
      setFilteredGames(games);
    }
  }, [selectedCategory, games]);

  return (
    <Container>
      <Header>
        <Title>
          Dev<Text style={{color: '#FF455F'}}>Games</Text>
        </Title>

        <SaveButton onPress={() => navigation.navigate('Favorite')}>
          <Icon name="bookmark" size={24} color={'#fff'} />
        </SaveButton>
      </Header>

      <InputView>
        <Input
          placeholder="Looking for a game?"
          placeholderTextColor={'#fff'}
          value={searchGames}
          onChangeText={setSearchGames}
        />
        <Icon name="search" size={30} color={'#FF455F'} />
      </InputView>

      <ViewList>
        <ListCategory
          data={category}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CategoryList
              data={item}
              onPress={() => setSelectedCategory(item.name)}
            />
          )}
          horizontal
        />
        <TitleList>Trending Games</TitleList>
        {loading ? (
          <ActivityIndicator size="large" color="#FF455F" />
        ) : (
          <List
            data={filteredGames}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View>
                {item.background_image ? (
                  <ImageBackground data={item} />
                ) : (
                  <View
                    style={{
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ddd',
                    }}>
                    <Text>No Image Available</Text>
                  </View>
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 80}}
          />
        )}
      </ViewList>
    </Container>
  );
}
