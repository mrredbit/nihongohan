import React, {Component} from 'react';
import {
    AsyncStorage
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

import WordCardList from './WordCardList';
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
            categories: [],
            sections: [],
            characters: [],
            appSection: 'WORDS'
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

        AsyncStorage.getItem('categories', function (err, data) {
            if (data !== null) {
                const categories = JSON.parse(data);
                self.setState({
                    categories: categories
                })
            }
        });

        AsyncStorage.getItem('sections', function (err, data) {
            if (data !== null) {
                const sections = JSON.parse(data);
                self.setState({
                    sections: sections
                })
            }
        });

        dsWords.getWordList().then((data) => {
            const words = data.words;
            const categories = data.categories;
            const sections = data.sections;

            AsyncStorage.setItem('words', JSON.stringify(words), function () {
                if (words !== null) {
                    self.setState({
                        words: words
                    })
                }
            });

            AsyncStorage.setItem('categories', JSON.stringify(categories), function () {
                if (categories !== null) {
                    self.setState({
                        categories: categories
                    })
                }
            });

            AsyncStorage.setItem('sections', JSON.stringify(sections), function () {
                if (sections !== null) {
                    self.setState({
                        sections: sections
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
        if (this.state.appSection === 'WORDS') {
            section = <WordCardList words={this.state.words}
                                    categories={this.state.categories}
                                    sections={this.state.sections}/>
        } else if (this.state.appSection === 'CHARACTERS') {
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
                            <Button full onPress={() => this.setState({appSection: 'WORDS'})}>
                                <Text style={styles.sectionButton}>毎日の言葉</Text>
                            </Button>
                            <Button full onPress={() => this.setState({appSection: 'CHARACTERS'})}>
                                <Text style={styles.sectionButton}>五十音</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = {
    container: {backgroundColor: '#f4f4f4'},
    title: {fontSize: 18},
    sectionButton: {fontSize: 18, lineHeight: 24}
};