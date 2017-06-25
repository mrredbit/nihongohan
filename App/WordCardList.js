import React from 'react';

import WordCard from './WordCard';
import {
    Content
} from 'native-base';

export default ({words}) => {
    return <Content>
        {words.map(word => {
            let character = word.hiragana ? word.hiragana : word.katakana;
            return <WordCard key={word.english}
                             english={word.english}
                             kanji={word.kanji}
                             romaji={word.romaji}
                             character={character}/>
        })}
    </Content>
}
