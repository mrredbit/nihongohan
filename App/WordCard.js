import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    Body,
    Text,
    Card,
    CardItem
} from 'native-base';

export default (english, kanji, romaji, character) => {
    const kanjiWithBracket = kanji ? '【' + kanji + '】' : null;
    const mainLine = kanjiWithBracket ? character + '  ' + kanjiWithBracket : character;
    return <Card>
        <CardItem>
            <Body>
            <Text style={styles.english}>{english}</Text>
            <Text style={styles.mainLine}>{mainLine}</Text>
            <Text style={styles.romaji}>{romaji}</Text>
            </Body>
        </CardItem>
    </Card>
}

const styles = StyleSheet.create({
    english: {fontWeight: 'bold', marginBottom: 5},
    mainLine: {fontSize: 20, lineHeight: 26},
    romaji: {fontSize: 12, color: '#aaa'}
});
