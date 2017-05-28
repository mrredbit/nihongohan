import 'whatwg-fetch';

export default {
    getWordList() {
        return fetch('https://spreadsheets.google.com/feeds/list/1fsdItIA53Qs3h1sy9BufYCmEJ19ik9hccovngrx7gIQ/od6/public/values?alt=json').then(function (response) {
            return response.json()
        }).then(function (json) {
            return json.feed.entry.map(function (row) {
                return {
                    english: row['gsx$english']['$t'],
                    romaji: row['gsx$romaji']['$t'],
                    hiragana: row['gsx$hiragana']['$t'],
                    katakana: row['gsx$katakana']['$t'],
                    kanji: row['gsx$kanji']['$t'],
                    example: row['gsx$example']['$t']
                }
            }).reverse()
        })
    }
}