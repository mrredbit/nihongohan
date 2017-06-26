import React, {Component} from 'react';

import WordCard from './WordCard';
import {
    Content,
    Picker,
    Grid,
    Col,
    Body,
    Card
} from 'native-base';

const Item = Picker.Item;

export default class WordCardList extends Component {
    constructor() {
        super();
        this.state = {
            category: 'all',
            section: 'Word of the Day'
        }
    }

    render() {
        const {words, sections} = this.props;
        let section;
        if (sections) {
            section = sections.filter(section => {
                return section.name === this.state.section
            });
        }
        const categories = section.length ? section[0].categories : [];
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
                                    section: value,
                                    category: 'all'
                                });
                            }}
                            style={styles.filter}>

                        { sections && sections.map(section => {
                            if (section.name === 'all') {
                                return <Item key="all" label="All Sections" value="all"/>
                            }
                            if (section) {
                                return <Item key={section.name} label={section.name} value={section.name}/>
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
                        { categories.map(category => {
                            if (category === 'all') {
                                return <Item key="all" label="All Categories" value="all"/>
                            }
                            if (category) {
                                return <Item key={category} label={category} value={category}/>
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