import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Text,
    Grid,
    Row,
    Col
} from 'native-base';

export default (characters) => {
    return <Grid>{characters.map((section, index) => {
        return <Row key={index} style={styles.row}>
            {section.map((character, index) => {
                return <Col key={index} style={styles.col}>
                    <Text style={styles.romaji}>{character.romaji}</Text>
                    <Text style={styles.character}>{character.hiragana}</Text>
                </Col>
            })}
        </Row>
    })}
    </Grid>
}

const styles = StyleSheet.create({
    row: {marginTop: 10, marginBottom: 10},
    col: {alignItems: 'center', justifyContent: 'center'},
    romaji: {fontSize: 20},
    character: {fontSize: 30}
});
