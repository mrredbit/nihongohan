import React, {Component} from 'react';
import {
    AsyncStorage,
    StyleSheet
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Right,
    Body,
    Text,
    StyleProvider
} from 'native-base';

import WordCard from './WordCard';
import CharactersList from './CharactersList';

import getTheme from '../native-base-theme/components';
import customColor from '../native-base-theme/variables/customColor';
import dsWords from '../data/words';
import dsCharacters from '../data/characters';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            words: [],
            characters: [],
            section: 'WORDS'
        }
    }

    componentDidMount() {
        const self = this;
        AsyncStorage.getItem('words', function (err, data) {
            if (data !== null) {
                const words = JSON.parse(data);
                self.setState({
                    words: words
                })
            }
        });

        dsWords.getWordList().then((words) => {
            AsyncStorage.setItem('words', JSON.stringify(words), function () {
                if (words !== null) {
                    self.setState({
                        words: words
                    })
                }
            });
        });

        AsyncStorage.getItem('characters', function (err, data) {
            if (data !== null) {
                const characters = JSON.parse(data);
                self.setState({
                    characters: characters
                })
            }
        });

        dsCharacters.getCharacterList().then((characters) => {
            AsyncStorage.setItem('characters', JSON.stringify(characters), function () {
                if (characters !== null) {
                    self.setState({
                        characters: characters
                    })
                }
            });
        });
    }

    render() {
        let section;
        if (this.state.section === 'WORDS') {
            section = this.state.words.map((word => {
                let character = word.hiragana ? word.hiragana : word.katakana;
                return <WordCard key={word.english}
                                 word={word.english}
                                 kanji={word.kanji }
                                 romaji={word.romaji}
                                 character={character}/>
            }))
        } else if (this.state.section === 'CHARACTERS') {
            section = <CharactersList characters={this.state.characters}/>
        }

        return (
            <StyleProvider style={getTheme(customColor)}>
                <Container style={styles.container}>
                    <Header>
                        <Body>
                        <Title style={styles.title}>サムの日本語</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content ref='section'>
                        {section}
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button full onPress={() => this.setState({section: 'WORDS'})}>
                                <Text style={styles.sectionButton}>毎日の言葉</Text>
                            </Button>
                            <Button full onPress={() => this.setState({section: 'CHARACTERS'})}>
                                <Text style={styles.sectionButton}>五十音</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {backgroundColor: '#f4f4f4'},
    title: {fontSize: 18},
    sectionButton: {fontSize: 18, lineHeight: 24}
});
