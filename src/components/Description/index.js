import {View} from 'react-native';
import {
  Container,
  DescriptionText,
  ShowMoreButton,
  ShowMoreText,
} from './styles';
import {useState} from 'react';

export function Description({text, maxLength, modal}) {
  const [showFullText, setShowFullText] = useState(false);

  function toggleShowMore() {
    setShowFullText(!showFullText);
  }

  function openModal() {
    modal();
  }

  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <Container>
      <DescriptionText>{showFullText ? text : truncatedText}</DescriptionText>
      <ShowMoreButton onPress={openModal}>
        <ShowMoreText>Read full Description</ShowMoreText>
      </ShowMoreButton>
    </Container>
  );
}
