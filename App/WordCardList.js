import React, {Component} from 'react';

import WordCard from './WordCard';
import {
    Content,
    Picker,
    Item,
    Grid,
    Col
} from 'native-base';

export default class WordCardList extends Component {
    constructor() {
        super();
        this.state = {
            category: 'all',
            section: 'all'
        }
    }

    render() {
        const {words, categories, sections} = this.props;
        const filter = <Content>
            <Grid>
                <Col>
                    <Picker mode="dropdown"
                            iosHeader="Select Section"
                            headerBackButtonText="Back"
                            selectedValue={this.state.section}
                            onValueChange={value => {
                                this.setState({
                                    section: value
                                });
                            }}
                            style={styles.filter}>
                        <Item label="All Section" value="all"/>
                        { sections && sections.map(section => {
                            if (section) {
                                return <Item label={section} value={section}/>
                            }
                        })}
                    </Picker>
                </Col>
                <Col>
                    <Picker mode="dropdown"
                            iosHeader="Select Category"
                            headerBackButtonText="Back"
                            selectedValue={this.state.category}
                            onValueChange={value => {
                                this.setState({
                                    category: value
                                });
                            }}
                            style={styles.filter}>
                        <Item label="All Category" value="all"/>
                        { categories && categories.map(category => {
                            if (category) {
                                return <Item label={category} value={category}/>
                            }
                        })}
                    </Picker>
                </Col>
            </Grid>
        </Content>

        return <Content>
            <Content>
                {filter}
            </Content>
            <Content>
                {words.map(word => {
                    if (this.state.category === 'all' || this.state.category === word.category) {
                        if (this.state.section === 'all' || this.state.section === word.section) {
                            let character = word.hiragana ? word.hiragana : word.katakana;
                            return <WordCard key={word.english}
                                             english={word.english}
                                             kanji={word.kanji}
                                             romaji={word.romaji}
                                             character={character}/>
                        }
                    }
                })}
            </Content>
        </Content>
    }
}


const styles = {
    filter: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        color: '#000',
        marginBottom: 5
    }
}