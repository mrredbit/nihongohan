import 'whatwg-fetch';

export default {
    getWordList() {
        return fetch('https://spreadsheets.google.com/feeds/list/1fsdItIA53Qs3h1sy9BufYCmEJ19ik9hccovngrx7gIQ/od6/public/values?alt=json').then(function (response) {
            return response.json()
        }).then(function (json) {
            return {
                categories: [...new Set(json.feed.entry.map(function (row) {
                    if (row['gsx$category']['$t']) {
                        return row['gsx$category']['$t'];
                    } else {
                        return 'Uncategorised';
                    }
                }))],
                sections: [...new Set(json.feed.entry.map(function (row) {
                    if (row['gsx$section']['$t']) {
                        return row['gsx$section']['$t'];
                    } else {
                        return 'Uncategorised';
                    }
                }))],
                words: json.feed.entry.map(function (row) {
                    return {
                        category: row['gsx$category']['$t'] || 'Uncategorised',
                        section: row['gsx$section']['$t'] || 'Uncategorised',
                        english: row['gsx$english']['$t'],
                        romaji: row['gsx$romaji']['$t'],
                        hiragana: row['gsx$hiragana']['$t'],
                        katakana: row['gsx$katakana']['$t'],
                        kanji: row['gsx$kanji']['$t'],
                        example: row['gsx$example']['$t']
                    }
                }).reverse()
            }
        })
    }
}