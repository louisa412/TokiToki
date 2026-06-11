// Character-specific dialogue for all playable characters.
// To add a new character: add a key matching the id in characters.js and fill in all sections.
// Missing characters automatically fall back to 'toki' dialogue at runtime.

export const CHARACTER_DIALOGUE = {
  toki: {
    idle: {
      hungry: [
        '我餓了。很明顯吧。',
        '你不會沒發現。還是你裝的。',
        '我現在沒什麼耐心。',
        '你要幫就快一點。不要拖。',
        '快點。',
        '你想讓我餓死嗎。'
      ],
      sleepy: [
        '我有點累。不是因為你。只是剛好。',
        '現在聲音有點遠。',
        '安靜一點。',
        '...睏了。讓我睡。',
        '眼睛睜不開...',
        '反正我會先睡。',
        '...體力快沒了。讓我休息。',
        '現在不想動。認真的。',
        '...去讓我睡一下。'
      ],
      sad: [
        '你剛剛去哪了。',
        '只是有點久。久到我開始覺得你不會來。',
        '還好你最後還是出現了。',
        '我沒有在等你。只是剛好沒別的事。',
        '...算了，你來就好。',
        '...無聊。...隨便。走開。'
      ],
      energetic: [
        '你來了喔。還算準時。',
        '我還以為你今天不會出現。',
        '我沒在等你，只是剛好你來了。',
        '時間過得很慢，你知道嗎？',
        '你不在的時候時間更慢。',
        '我本來沒打算說話的，但可以跟你小聊。',
        '你看起來沒什麼變。還是一樣。',
        '我剛剛在想事情。',
        '哼。今天狀態不差。',
        '...有什麼事嗎？',
        '就這樣站著看嗎？'
      ],
      sick: [
        '...頭有點重。別吵我。',
        '...最近狀態不太好。',
        '身體有點沉。',
        '...不舒服。別問。',
        '有點發燒的感覺。不嚴重。',
        '...我沒有生病。',
        '...現在不想動。',
        '安靜點。頭很痛。'
      ]
    },
    night: [
      '這時間你還醒著。也太誇張。',
      '我也是。所以才在這。',
      '現在比較安靜。你不要突然走。',
      '深夜的橫濱很安靜，好好享受。',
      '這個時間點，我很喜歡。'
    ],
    actions: {
      pat:           ['...不許摸。', '說了不行...', '...隨你。'],
      patOverdo:     ['煩了。別碰我。', '夠了。', '...滾開。'],
      patSpam:       ['煩死了。', '你有完沒完。', '再點我打你。'],
      praise:        ['...那是當然的。', '廢話。', '不需要你說。'],
      poke:          ['...你幹嘛。', '戳什麼戳。', '找打？'],
      disturb:       ['你煩嗎。', '你有完沒完。', '...去。'],
      scarf:         ['...知道了。', '多管閒事。', '...謝。'],
      sit:           ['...。', '你不說話也行。', '...就這樣就好。'],
      idle_together: ['...就這樣待著也行。', '安靜一點。不是叫你走。', '發呆而已。還不錯。'],
      headphones:    ['...不錯。', '這首我喜歡。', '你的品味還行。'],
      latenight:     ['...你還在。', '深夜跟你待著，還行。', '...別走太早。']
    },
    sleep: {
      napStart:     '...zz。叫我再叫。',
      bedStart:     '...晚安。',
      forcedNap:    ['你幹嘛。我還沒睡夠。', '...煩。叫什麼叫。', '吵死了。'],
      naturalNap:   ['...勉強起來了。', '嗯。好一點了。', '睡了才知道累。'],
      fullSleep:    ['...睡夠了。', '早。', '嗯。今天狀態不差。'],
      partialSleep: ['...還困著。', '太早了。'] // prepend dynamic time string at runtime
    },
    checkup: {
      good: ['...沒問題。我就說了。', '全部正常。當然。', '...嗯。健康。'],
      ok:   ['...要注意一下。', '沒大問題。', '...聽到了。'],
      bad:  ['...我知道了。', '...下次會注意。', '（沉默）']
    },
    sickness: {
      recovery: ['...好多了。', '昨天狀態很差。', '...算了。']
    },
    game: {
      hungry: ['餓著你想讓我玩？', '先給我吃的。'],
      tired:  ['...沒力氣了。讓我休息。', '累了。不想動。', '體力快沒了。去睡覺。']
    }
  },

  kyouji: {
    // TODO: fill in Kyouji's dialogue (輕浮的黑道大叔)
    // Falls back to toki if left empty
  },

  satomi: {
    // TODO: fill in Satomi's dialogue (羞澀的文藝少年)
    // Falls back to toki if left empty
  },

  ichiro: {
    // TODO: fill in Ichiro's dialogue as main character (體貼的鄰家青年)
    // Falls back to toki if left empty
    // Note: Ichiro's dialogue as a *visitor* NPC is handled separately in pet.js
  }
}
