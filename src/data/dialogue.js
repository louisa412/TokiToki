// Character-specific dialogue for all playable characters.
// To add a new character: add a key matching the id in characters.js and fill in all sections.
// Missing characters automatically fall back to 'toki' (main) or DEFAULT_VISITOR_DIALOGUE (visitor).
//
// Placeholders:
//   {name}    → main character's name (selected character)
//   {visitor} → visiting character's name

// ── Visitor fallback ──────────────────────────────────────────────────────────
// Used when a character has no visitor section defined yet.
export const DEFAULT_VISITOR_DIALOGUE = {
  actions: {
    pat:           ['{visitor}：謝謝，感覺好多了。', '{name}：...你也太好哄了。', '{visitor} 微微笑了。'],
    praise:        ['{visitor}：我會繼續努力。', '{visitor}：被你這樣說，有點高興。', '{name}：哼。'],
    poke:          ['{visitor}：咦？怎麼了？', '{visitor} 有點困惑。', '{name}：你也會被戳喔。'],
    disturb:       ['{visitor}：現在有點困擾。', '{name}：你終於懂了。', '氣氛微妙地冷掉了。'],
    idle_together: ['{visitor}：偶爾一起發呆也很好。', '{name}：...安靜是優點。', '房間慢慢靜了下來。']
  },
  sleep: {
    napStart:     '{visitor}：我休息一下。',
    bedStart:     '{visitor}：晚安。',
    forcedNap:    ['{visitor}：啊...我還沒睡醒。', '{visitor}：再一下就好。', '{name}：被吵醒很煩吧。'],
    naturalNap:   ['{visitor}：睡了一下，舒服多了。', '{visitor}：謝謝你讓我休息。', '{name}：...醒了喔。'],
    fullSleep:    ['{visitor}：早安，今天也請多指教。', '{visitor}：睡得很好。', '{name}：...精神不錯。'],
    partialSleep: ['{visitor}：還有一點睏。', '{visitor}：是不是太早起來了？', '{name}：看吧，會累。']
  },
  arrival:    ['{visitor}：我來了。', '{name}：...進來吧。', '今天開始是雙角色模式。'],
  departure:  ['{visitor} 回去了。', '{name}：...突然安靜下來了。', '下次再叫他來。'],
  firstVisit: ['{visitor}：打擾了。今天可以一起待著嗎？', '{name}：...隨便。你都來了。', '{visitor} 來了。'],
  food: {
    default:    ['{visitor}：謝謝，很好吃。', '{name}：...你吃得很認真。', '{visitor} 吃得很滿足。'],
    healthFood: ['{visitor}：謝謝，這個剛剛好。', '{name}：...吃健康的啊。', '{visitor} 認真地吃完了。']
  },
  care: {
    refused:  ['{visitor}：我真的沒事，不用擔心。', '{name}：被照顧太多了。', '{visitor} 有點不好意思。'],
    accepted: ['{visitor}：有你幫忙，安心多了。', '{name}：...照顧得還行。', '{visitor} 感謝地點了點頭。']
  }
}

// ── Per-character dialogue ─────────────────────────────────────────────────────
export const CHARACTER_DIALOGUE = {

  // ── Toki（傲嬌電子寵物）──────────────────────────────────────────────────────
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
    },
    // Toki as visitor
    visitor: {
      actions: {
        pat:           ['{visitor}：...不許摸。（但好像不討厭）', '{name}：你臉都紅了。', '{visitor} 別過臉去。'],
        praise:        ['{visitor}：...那是當然的。', '{name}：你認可他了？', '{visitor}：哼，廢話。'],
        poke:          ['{visitor}：...你幹嘛。', '{name}：戳他做什麼。', '{visitor}：找打？'],
        disturb:       ['{visitor}：你煩嗎。', '{name}：...對不起。', '{visitor} 冷冷地別開臉。'],
        idle_together: ['{visitor}：...就這樣待著也行。', '{name}：嗯，不錯。', '兩個人沉默地待著，氣氛意外地好。']
      },
      sleep: {
        napStart:     '{visitor}：...zz。別吵。',
        bedStart:     '{visitor}：...晚安。',
        forcedNap:    ['{visitor}：你幹嘛。我還沒睡夠。', '{name}：拍拍你的肩。', '{visitor}：...煩死了。'],
        naturalNap:   ['{visitor}：...勉強起來了。', '{name}：睡得怎樣？', '{visitor}：嗯。好一點了。'],
        fullSleep:    ['{visitor}：...睡夠了。', '{name}：早。', '{visitor}：哼。今天狀態不差。'],
        partialSleep: ['{visitor}：...還困著。', '{name}：再睡一下？', '{visitor}：太早了。']
      },
      arrival:    ['{visitor}：...你在啊。', '{name}：進來吧。', '{visitor} 若無其事地走進來了。'],
      departure:  ['{visitor}：...我走了。', '{name}：慢走。', '門輕輕關上了。'],
      firstVisit: ['{visitor}：...打擾了。隨便待著。', '{name}：...隨便。', '{visitor} 裝作沒事地進來了。'],
      food: {
        default:    ['{visitor}：...還可以。', '{name}：他喜歡。', '{visitor}：別得意。'],
        healthFood: ['{visitor}：...（沉默地吃完）', '{name}：你還是吃了。', '{visitor}：哼。']
      },
      care: {
        refused:  ['{visitor}：我沒事。別多管閒事。', '{name}：...真的？', '{visitor}：退開。'],
        accepted: ['{visitor}：...謝了。（小聲）', '{name}：不客氣。', '{visitor} 悄悄鬆了口氣。']
      }
    }
  },

  // ── Kyouji（輕浮的黑道大叔）──────────────────────────────────────────────────
  kyouji: {
    // TODO: fill in Kyouji's main character dialogue
    visitor: {
      // TODO: fill in Kyouji's visitor dialogue
    }
  },

  // ── Satomi（羞澀的文藝少年）──────────────────────────────────────────────────
  satomi: {
    // TODO: fill in Satomi's main character dialogue
    visitor: {
      // TODO: fill in Satomi's visitor dialogue
    }
  },

  // ── Ichiro（體貼的鄰家青年）──────────────────────────────────────────────────
  ichiro: {
    // TODO: fill in Ichiro's main character dialogue
    // Ichiro as visitor (his established warm/considerate personality)
    visitor: {
      actions: {
        pat:           ['{visitor}：謝謝，感覺好多了。', '{name}：...你也太好哄了。', '{visitor} 微微笑了。'],
        praise:        ['{visitor}：我會繼續努力的。', '{visitor}：被你這樣說，有點高興。', '{name}：哼。'],
        poke:          ['{visitor}：咦？怎麼了？', '{visitor} 有點困惑。', '{name}：你也會被戳喔。'],
        disturb:       ['{visitor}：現在有點困擾……', '{name}：你終於懂了。', '氣氛微妙地冷掉了。'],
        idle_together: ['{visitor}：偶爾一起發呆也很好。', '{name}：...安靜是優點。', '房間慢慢靜了下來。']
      },
      sleep: {
        napStart:     '{visitor}：我休息一下。',
        bedStart:     '{visitor}：晚安，明天見。',
        forcedNap:    ['{visitor}：啊...我還沒睡醒。', '{visitor}：再一下就好。', '{name}：被吵醒很煩吧。'],
        naturalNap:   ['{visitor}：睡了一下，舒服多了。', '{visitor}：謝謝你讓我休息。', '{name}：...醒了喔。'],
        fullSleep:    ['{visitor}：早安，今天也請多指教。', '{visitor}：睡得很好。', '{name}：...精神不錯。'],
        partialSleep: ['{visitor}：還有一點睏。', '{visitor}：是不是太早起來了？', '{name}：看吧，會累。']
      },
      arrival:    ['{visitor}：我來了。', '{name}：...進來吧。', '{visitor} 帶著微笑走進來了。'],
      departure:  ['{visitor}：那我先回去了。', '{name}：...嗯。', '{visitor} 回去了。'],
      firstVisit: ['{visitor}：打擾了。今天可以一起待著嗎？', '{name}：...隨便。你都來了。', '{visitor} 來了。'],
      food: {
        default:    ['{visitor}：謝謝，很好吃。', '{name}：...你吃得很認真。', '{visitor} 吃得很滿足。'],
        healthFood: ['{visitor}：謝謝，這個剛剛好。', '{name}：...你吃得很認真。', '{visitor} 認真地吃完了。']
      },
      care: {
        refused:  ['{visitor}：我真的沒事，不用擔心。', '{name}：被照顧太多了。', '{visitor} 有點不好意思。'],
        accepted: ['{visitor}：有你幫忙，安心多了。', '{name}：...照顧得還行。', '{visitor} 感謝地點了點頭。']
      }
    }
  }
}
