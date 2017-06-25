import React, {Component} from 'react';

import WordCard from './WordCard';
import {
    Content,
    Picker,
    Item,
    Grid,
    Col,
    Body,
    Card
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
        const filter = <Card>
            <Body>
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
                        <Item label="All Sections" value="all"/>
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
                        <Item label="All Categories" value="all"/>
                        { categories && categories.map(category => {
                            if (category) {
                                return <Item label={category} value={category}/>
                            }
                        })}
                    </Picker>
                </Col>
            </Grid>
            </Body>
        </Card>

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
        color: '#000'
    }
}