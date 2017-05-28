import 'whatwg-fetch';

export default {
    getCharacterList() {
        return fetch('https://spreadsheets.google.com/feeds/list/1fsdItIA53Qs3h1sy9BufYCmEJ19ik9hccovngrx7gIQ/o8imqgh/public/values?alt=json').then(function (response) {
            return response.json()
        }).then(function (json) {
            let characters = [];
            for (var row of json.feed.entry) {
                const section = row['gsx$section']['$t'];
                const romaji = row['gsx$romaji']['$t'];
                const hiragana = row['gsx$hiragana']['$t'];
                const katakana = row['gsx$katakana']['$t'];
                if (section && !(romaji)) {
                    characters.push([]);
                } else {
                    characters[characters.length - 1].push({
                        section: section,
                        romaji: romaji,
                        hiragana: hiragana,
                        katakana: katakana
                    });
                }
            }
            return characters;

            // return json.feed.entry.map(function (row) {
            //     if (row['gsx$romaji']['$t']) {
            //         return {
            //             section: row['gsx$section']['$t'],
            //             romaji: row['gsx$romaji']['$t'],
            //             hiragana: row['gsx$hiragana']['$t'],
            //             katakana: row['gsx$katakana']['$t']
            //         }
            //     }
            // })
        })

    }
}