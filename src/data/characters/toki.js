export default {
  id:        'toki',
  name:      'Toki',
  tagline:   '傲嬌黑道少主',
  available: true,

  // ── Main-character food preferences ───────────────────────────────────────
  // Only list foods that differ from the neutral fallback in FOODS.
  // healthFood: override msgTiers / mooTiers / affTiers instead of moo/aff/msgs.
  foods: {
    coffee:       { moo: 10,  aff: 5,   sp: 'praised',   msgs: ['嗯。這個可以。', '...勉強合格。', '黑的才對。'] },
    ramen:        { moo: 15,  aff: 10,  sp: 'happy',     msgs: ['...不錯。', '哼，還可以啦。', '就是要吃這個。'] },
    bento:        { moo: 10,  aff: 8,   sp: 'energetic', msgs: ['蛋白質？好吧，補充完畢。', '...吃完了，好飽。', '好。'] },
    mapo:         { moo: 20,  aff: 15,  sp: 'happy',     msgs: ['...辣得剛好。', '汗出來了...', '這份做得不錯。'] },
    porridge:     { moo: -20, aff: 30,  sp: 'sad',       msgs: ['......你做的？', '...甜的，噁。', '...為什麼是草莓。算了。'] },
    cig:          { moo: 25,  aff: 5,   sp: 'praised',   msgs: ['...這種例外。', '不是我喜歡甜的。', '...好抽。'] },
    shumai:       { moo: 10,  aff: 5,   sp: 'energetic', msgs: ['這就是橫濱的味道。', '...合格。', '還不錯。'] },
    energy:       { moo: 5,   aff: 0,   sp: 'energetic', msgs: ['準備好了。', '...體力回來了。', '來吧。'] },
    dark_choco:   { moo: 5,   aff: 3,   sp: 'praised',   msgs: ['...還不錯。', '苦度可以。', '不是因為甜才吃。'] },
    sports_drink: { moo: -5,  aff: 0,   sp: 'helpless',  msgs: ['這種東西喝多了不好。', '...補水而已。', '下次別買太甜的。'] },
    noodle:       { moo: 15,  aff: 8,   sp: 'happy',     msgs: ['...深夜吃這個最好。', '泡麵就是要加蛋啊', '...燙的才行。'] },
    beer:         { moo: 20,  aff: 5,   sp: 'happy',     msgs: ['...舒服。', '苦的才對。', '今天喝一罐就好。'] },
    onigiri:      { moo: 5,   aff: 3,   sp: 'energetic', msgs: ['簡單的就行。', '...調味很剛好。', '不用太多。'] },
    donut:        { moo: 30,  aff: 8,   sp: 'happy',     msgs: ['...我沒說喜歡吃甜的。', '別說出去。', '是你叫我吃的。'] },
    chips:        { moo: 15,  aff: 5,   sp: 'energetic', msgs: ['辣的才好吃。', '滿脆的。', '可以。'] },
    matcha:       { moo: 20,  aff: 10,  sp: 'praised',   msgs: ['...抹茶還可以。', '甜度挺剛好。', '...你記得我喜歡這個？'] },
    salad:    { mooTiers: [-15, -8, -4], affTiers: [-5, -2, 0], msgTiers: [['你想幹嘛。這什麼東西。', '我又不是兔子。', '...不吃。'], ['...你是認真的。', '吃就吃。少廢話。', '...隨便。'], ['...算了。你說好就好。', '...不難吃。（小聲）', '...謝了。']] },
    greentea: { mooTiers: [-5, -2,  0], affTiers: [ 0,  0, 3], msgTiers: [['...這什麼。', '沒味道。', '你在折磨我？'], ['...還行。', '淡的。', '勉強喝。'], ['...習慣了。', '有點苦。還行。', '...謝了。']] },
    chicken:  { mooTiers: [-20,-12, -6], affTiers: [-8, -3, 0], msgTiers: [['你在懲罰我嗎。', '這叫吃飯？', '...難吃。'], ['...吃完了。', '下次別這個。', '...哼。'], ['...你擔心我？', '知道了。吃就吃。', '...沒你想的那麼難吃。（小聲）']] }
  },

  // ── Visitor food preferences (when Toki visits someone else's home) ────────
  visitorFoods: {
    cig:      { moo: 20,  aff: 8,  sp: 'praised', msgs: ['{name}：你也喜歡這個？', '{visitor}：這個可以。', '兩個人一起抽。'] },
    porridge: { moo: -15, aff: 20, sp: 'sad',     msgs: ['{visitor}：...什麼。', '{name}：你不喜歡嗎。', '{visitor}：...甜的。算了。'] }
  },

  // ── Dialogue ──────────────────────────────────────────────────────────────
  dialogue: {
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
      '這個時間點，我很喜歡。',
      '...深夜才說得了實話。但我不想說。'
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
      partialSleep: ['...還困著。', '太早了。']
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
  }
}
