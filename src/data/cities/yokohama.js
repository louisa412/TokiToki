// cities/yokohama.js
// TokiToki 橫濱城市配置 v1.0
// 高精緻模式：30 地點 ＋ 記憶系統 ＋ 偏好系統 ＋ 事件系統
// ─────────────────────────────────────────────
// tier:       'core' | 'normal' | 'rare'
// preference: 'loved' | 'neutral' | 'disliked'
// ─────────────────────────────────────────────

export const CITY_META = {
  id: 'yokohama',
  name: '橫濱',
  nameJP: '横浜',
  complexityTier: 'premium',
  walkDurationMs: 30 * 60 * 1000,
  poolSize: 6,
  baseRewards: { mood: 15, affection: 8 },
}

// ═══════════════════════════════════════════════
// 地點資料庫
// ═══════════════════════════════════════════════

export const LOCATIONS = [

  // ──────────────────────────────────────────────
  // ★ 核心地點 ── 海濱情緒地帶
  // ──────────────────────────────────────────────

  {
    id: 'minatomirai',
    name: '港未來',
    nameJP: 'みなとみらい',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 30,
    rewards: { mood: 15, affection: 8 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '觀光客很多。不過海是真的。',
            '人太多了。⋯⋯不過算了，海沒有人多。',
          ],
          night: [
            '晚上好一點。人少，燈多。',
            '夜晚的港未來⋯⋯不讓人煩。就這樣。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '你很喜歡這裡。我有注意到。',
            '這裡的海，看多少次都一樣。⋯⋯不是壞事。',
          ],
          night: [
            '每次來感覺差不多。這樣也好。',
            '燈光沒什麼變。海也沒什麼變。穩定。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '來這裡幾次了？我懶得數了。',
            '你老帶我來這裡。⋯⋯我沒在抱怨。',
          ],
          night: [
            '這裡的夜景，我大概這輩子都不會膩。不許說出去。',
            '每次來，我都想哪天不想來了。還沒有那天。',
          ],
        },
      ],
    },
  },

  {
    id: 'akarenga',
    name: '橫濱紅磚倉庫',
    nameJP: '赤レンガ倉庫',
    tier: 'core',
    preference: 'loved',
    category: 'waterfront',
    baseWeight: 30,
    rewards: { mood: 18, affection: 12 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '明治時代的磚。還站著。有點意思。',
            '這種建築，現在蓋不出來。',
          ],
          night: [
            '打燈之後，好像另一個地方。',
            '磚在燈光裡，有點像電影。⋯⋯不是在稱讚。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '這裡的磚，每塊顏色都稍微不一樣。你注意過嗎？',
            '帶我來幾次了。⋯⋯三次還四次？我沒在算。',
          ],
          night: [
            '這個時間才是真正的赤レンガ。白天人太多。',
            '人走了，磚還在那裡。我喜歡這樣的東西。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '百年的東西站在那裡，有點令人放心。',
            '⋯⋯我不說這是我喜歡的地方，但你應該猜到了。',
          ],
          night: [
            '這裡，我小時候也來過。白天的事了。',
            '每次來都一樣，每次感覺不太一樣。說不清楚。',
          ],
        },
      ],
      loved: {
        highAff: [
          '⋯⋯跟你在這裡，不需要說什麼。別放大解讀。',
          '這裡的海風⋯⋯算了，沒什麼。走了。',
        ],
      },
    },
  },

  {
    id: 'osanbashi',
    name: '大棧橋',
    nameJP: '大さん橋',
    tier: 'core',
    preference: 'loved',
    category: 'waterfront',
    baseWeight: 30,
    rewards: { mood: 18, affection: 12 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '木甲板，海在旁邊。不壞。',
            '國際碼頭。船來船去。',
          ],
          night: [
            '晚上這裡的人，互相看不清臉。適合我。',
            '夜晚的海在腳下⋯⋯這種感覺不錯。就這樣。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '這裡的木板走起來聲音不太一樣。你注意到了嗎？',
            '海風比其他地方大。我習慣了。',
          ],
          night: [
            '夜晚來這裡的人，都各自看著自己的海。',
            '人有，但沒有人在意彼此。⋯⋯我喜歡這樣。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '這片海，來幾次都還是這片海。',
            '我好像每次都站同一個地方。',
          ],
          night: [
            '大棧橋的夜晚⋯⋯是我最不需要說話的地方。',
            '這裡的海，夜晚最誠實。我也是。',
          ],
        },
      ],
      loved: {
        highAff: [
          '⋯⋯不說話也沒關係。就這樣站著。',
          '跟你看這片海⋯⋯嗯。沒什麼。',
        ],
      },
    },
  },

  {
    id: 'yamashita',
    name: '山下公園',
    nameJP: '山下公園',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 28,
    rewards: { mood: 14, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['玫瑰很多，觀光客也很多。', '這裡的海，算是可以的。'],
          night: ['晚上少一點人了。這樣比較好。', '夜晚的山下公園⋯⋯還行。'],
        },
        {
          minVisits: 3,
          day: ['這裡的玫瑰，每次來都有不同的在開。', '老地方了。'],
          night: ['夜晚的海風從這裡吹過來，直的。', '習慣了，這裡。'],
        },
        {
          minVisits: 8,
          day: ['來了這麼多次，玫瑰我都快認識了。', '這公園，說不上哪裡好，但一直來。'],
          night: ['這裡的夜晚，有點像在等什麼。不知道等什麼。', '⋯⋯算了，這裡還行。'],
        },
      ],
    },
  },

  {
    id: 'cosmoclock',
    name: '太空世界摩天輪',
    nameJP: 'コスモクロック21',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 25,
    rewards: { mood: 13, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['這輪子轉了三十幾年了。還在轉。', '摩天輪⋯⋯不是我的風格。'],
          night: ['夜晚看起來比白天好一點。', '燈的顏色變來變去，有點吵。但⋯⋯算了。'],
        },
        {
          minVisits: 3,
          day: ['這東西，我從小就在這裡了。', '⋯⋯你也喜歡這個？'],
          night: ['轉一圈需要十五分鐘。我算過。', '夜晚的顏色還是在變。習慣了。'],
        },
        {
          minVisits: 8,
          day: ['這摩天輪是橫濱地標。我不得不承認。', '比我更長壽的東西，得尊重。'],
          night: ['這燈光，晚上從很遠就看得到。⋯⋯確認你在哪裡的感覺。', '⋯⋯也不是不好看。'],
        },
      ],
    },
  },

  {
    id: 'rinko',
    name: '臨港公園',
    nameJP: '臨港パーク',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 26,
    rewards: { mood: 14, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['這裡的草很平整。有點假。', '海就在那裡。嗯。'],
          night: ['夜晚比較少人。這樣就好了。', '晚風從海那邊來的。'],
        },
        {
          minVisits: 3,
          day: ['開闊的地方讓人安靜。不討厭。', '這裡的風大，你穿夠了嗎。⋯⋯沒什麼。'],
          night: ['這時候幾乎沒有人了。好。', '夜晚的草坪，黑色的。有點奇怪，但安靜。'],
        },
        {
          minVisits: 8,
          day: ['來這裡的感覺，就是放空。', '開闊的地方，腦子也跟著空了。不壞。'],
          night: ['這裡的夜晚沒有聲音。我喜歡。', '⋯⋯這裡不需要說話。謝謝你知道。'],
        },
      ],
    },
  },

  {
    id: 'zouhana',
    name: '象之鼻公園',
    nameJP: '象の鼻パーク',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 24,
    rewards: { mood: 13, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['這名字很蠢。形狀是像象鼻就是了。', '這裡的防波堤很舊了。'],
          night: ['夜晚這裡有點靜。還行。', '港口的燈從這裡看，不壞。'],
        },
        {
          minVisits: 3,
          day: ['象之鼻⋯⋯這名字我說了幾百次還是覺得蠢。', '防波堤的石頭很有歷史感。'],
          night: ['這裡的海比大棧橋小一圈，但安靜。', '⋯⋯習慣這地方了。'],
        },
        {
          minVisits: 8,
          day: ['蠢名字，但這地方真的有歷史。開港的地方。', '橫濱就是從這裡開始的。你知道吧。'],
          night: ['夜晚看著這港口，想著以前的船⋯⋯有點多想了。', '這裡的歷史，比我有資格說的多得多。'],
        },
      ],
    },
  },

  {
    id: 'marinewalk',
    name: 'MARINE & WALK',
    nameJP: 'マリン&ウォーク',
    tier: 'core',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 22,
    rewards: { mood: 13, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['整排店舖，海在旁邊。商業感很重。', '這裡的人都在逛店。我不逛。'],
          night: ['夜晚燈光漂亮一點了。', '店都快關了，人少了，這樣比較對。'],
        },
        {
          minVisits: 3,
          day: ['你喜歡逛這種地方？⋯⋯沒說你不好。', '走走也行。'],
          night: ['關店之後的 Marine Walk，才是真的樣子。', '空的店面，海的聲音。不壞。'],
        },
        {
          minVisits: 8,
          day: ['人來人往的，我倒習慣了。', '你每次來是看什麼？⋯⋯好，不問了。'],
          night: ['這裡夜晚的海風是從正面來的。我記住了。', '⋯⋯這裡還行。'],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────
  // 🚶 一般地點 ── 日常街區
  // ──────────────────────────────────────────────

  {
    id: 'motomachi',
    name: '元町商店街',
    nameJP: '元町商店街',
    tier: 'normal',
    preference: 'loved',
    category: 'shopping',
    baseWeight: 20,
    rewards: { mood: 16, affection: 11 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '這裡是老店。不是那種網紅店。',
            '元町的店，是橫濱人的店。外地人也來，但感覺不一樣。',
          ],
          night: [
            '收攤之後，元町才有自己的氣氛。',
            '街燈下的元町，比白天好看。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '那家麵包店，你去過嗎。橫濱人都知道那家。',
            '這條街的石板，走起來聲音對。',
          ],
          night: [
            '夜晚這裡的人都是本地人。我能看出來。',
            '⋯⋯這裡讓我放鬆。你別說出去。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '帶你來這裡這麼多次，你算是懂元町了。',
            '這條街沒變過。我喜歡這樣的東西。',
          ],
          night: [
            '夜晚的元町，是屬於在這裡生活的人的。你現在也算。',
            '每次來這裡，我都知道自己是橫濱人。',
          ],
        },
      ],
      loved: {
        highAff: [
          '⋯⋯帶你來這裡，感覺像帶你認識我的地方。別多想。',
          '這裡的每條巷子我都走過。有一天帶你走走，也不是不行。',
        ],
      },
    },
  },

  {
    id: 'chinatown',
    name: '橫濱中華街',
    nameJP: '横浜中華街',
    tier: 'normal',
    preference: 'loved',
    category: 'food',
    baseWeight: 20,
    rewards: { mood: 17, affection: 10 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '這裡的味道，從小就記得。',
            '外地人把中華街當景點。我把它當廚房。',
          ],
          night: [
            '夜晚的中華街，燈籠全亮。吵，但我習慣了。',
            '晚上這裡的香味更重。肚子餓了。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '我有一家常去的小籠包店。不告訴你在哪裡。⋯⋯算了，跟我來。',
            '這裡的老闆娘認識我。別問。',
          ],
          night: [
            '夜晚的中華街像另一個世界。但是熟悉的另一個世界。',
            '吃過了嗎。沒吃的話⋯⋯不是我請你，你自己去買。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '帶你來這麼多次，你有沒有找到自己喜歡的店？',
            '這裡的每個角落我都走過。有些店現在沒了。',
          ],
          night: [
            '夜晚的中華街，我從小就喜歡。沒理由，就是喜歡。',
            '每次來，感覺像回到小時候。別笑。',
          ],
        },
      ],
      loved: {
        highAff: [
          '⋯⋯下次來，我帶你去那家小籠包。不是因為你，是因為我想吃。',
          '這裡的氣氛，跟你一起進來感覺不一樣。⋯⋯沒什麼。走了。',
        ],
      },
    },
  },

  {
    id: 'yokohamastation',
    name: '橫濱車站西口',
    nameJP: '横浜駅西口',
    tier: 'normal',
    preference: 'neutral',
    category: 'urban',
    baseWeight: 18,
    rewards: { mood: 11, affection: 5 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['人最多的地方。沒有特別想來。', '西口⋯⋯就是西口。'],
          night: ['夜晚人還是很多。不喜歡。', '終電前都是人。'],
        },
        {
          minVisits: 3,
          day: ['這裡我只是路過。每次。', '⋯⋯什麼都有，但不特別。'],
          night: ['散場的時間，人往四面流散。有點好看。', '終電的廣播⋯⋯聽習慣了。'],
        },
        {
          minVisits: 8,
          day: ['來這麼多次了，我還是不特別喜歡這裡。', '但說不喜歡也不公平，這裡很方便。'],
          night: ['夜晚的西口，每個人都在趕什麼。', '你不趕嗎。⋯⋯算了，不急就不急。'],
        },
      ],
    },
  },

  {
    id: 'kannai',
    name: '關內',
    nameJP: '関内',
    tier: 'normal',
    preference: 'neutral',
    category: 'urban',
    baseWeight: 19,
    rewards: { mood: 12, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['橫濱的行政中心。沒什麼特色，但踏實。', '這裡有球場。棒球不太懂。'],
          night: ['夜晚的關內有點舊城的感覺。', '老酒館多。不是壞事。'],
        },
        {
          minVisits: 3,
          day: ['這裡的街道比較安靜，我喜歡。', '不觀光，就是生活。'],
          night: ['關內的夜晚，小酒吧很多。', '⋯⋯偶爾喝一杯的地方。'],
        },
        {
          minVisits: 8,
          day: ['這裡的舊建築越來越少了。有點可惜。', '關內讓我覺得橫濱是有歷史的地方。'],
          night: ['夜晚走這條街，像走進時間裡面。', '⋯⋯這裡讓人安靜。'],
        },
      ],
    },
  },

  {
    id: 'noge',
    name: '野毛',
    nameJP: '野毛',
    tier: 'normal',
    preference: 'loved',
    category: 'nightlife',
    baseWeight: 20,
    rewards: { mood: 18, affection: 13 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '這裡才是橫濱。不是港未來那種。',
            '野毛的居酒屋，外地人不太敢進去。我喜歡這樣。',
          ],
          night: [
            '夜晚的野毛，燈是暖色的，味道是酒味的。正確。',
            '這裡的大叔，喝到打烊還在聊。我有時候也是。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '這條街的每家店我都知道哪家好。',
            '白天的野毛安靜，你不一定認得出來。',
          ],
          night: [
            '夜晚的野毛⋯⋯你會知道這裡的人是真的在生活。',
            '我常來的那家還開著。要進去看看嗎。⋯⋯不是約你喝酒。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '你帶我來野毛這麼多次，你真的懂我。⋯⋯別自作聰明。',
            '這裡的老闆娘說你是我朋友了。我沒說什麼。',
          ],
          night: [
            '野毛的夜晚，我不想離開的地方之一。不許說出去。',
            '⋯⋯謝謝你帶我來這裡。這句話你聽過了，不用再聽第二次。',
          ],
        },
      ],
      loved: {
        highAff: [
          '這裡的人都是自己人。你也算了。',
          '⋯⋯跟你喝一杯，也不是不行。就一杯。',
        ],
      },
    },
  },

  {
    id: 'isezakicho',
    name: '伊勢佐木町商店街',
    nameJP: '伊勢佐木町',
    tier: 'normal',
    preference: 'neutral',
    category: 'shopping',
    baseWeight: 18,
    rewards: { mood: 12, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['老商店街。現在比較沒落了。', '這裡的書店還在。好事。'],
          night: ['夜晚這裡有些地方有點⋯⋯複雜。', '走就好，別逗留。'],
        },
        {
          minVisits: 3,
          day: ['這裡的老書店我去過幾次。', '沒落的商店街，有種說不清的人情味。'],
          night: ['夜晚這裡人雜，但我在沒事。', '⋯⋯只要知道自己在哪裡就行。'],
        },
        {
          minVisits: 8,
          day: ['這條街，橫濱人小時候都來過。', '現在沒那麼熱鬧，但還是有些好店。'],
          night: ['夜晚的伊勢佐木⋯⋯有自己的故事。', '我不討厭這裡，就是說。'],
        },
      ],
    },
  },

  {
    id: 'hinodemachi',
    name: '日之出町',
    nameJP: '日ノ出町',
    tier: 'normal',
    preference: 'neutral',
    category: 'urban',
    baseWeight: 17,
    rewards: { mood: 12, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['野毛的隔壁。生活感重。', '這裡很在地。'],
          night: ['夜晚有點靜。適合走走。', '日之出町的夜晚，燈光是舊的那種黃色。'],
        },
        {
          minVisits: 3,
          day: ['這一帶，是橫濱真正的住宅感。', '這裡的人，感覺都有自己的事。'],
          night: ['夜晚走這裡，心情會安靜下來。', '⋯⋯這裡不需要表演什麼。'],
        },
        {
          minVisits: 8,
          day: ['住這附近的人，才是真正的橫濱人。', '來這裡，感覺像看到城市的底層。不是壞的意思。'],
          night: ['這裡的夜晚是給自己的時間。', '⋯⋯你懂什麼是這種感覺嗎。'],
        },
      ],
    },
  },

  {
    id: 'bashamichi',
    name: '馬車道',
    nameJP: '馬車道',
    tier: 'normal',
    preference: 'neutral',
    category: 'historic',
    baseWeight: 19,
    rewards: { mood: 13, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['這條街，以前真的有馬車。明治時代的事。', '舊建築保留得不錯。'],
          night: ['路燈是仿舊設計的。有點用心。', '夜晚的馬車道，有點歐洲感。'],
        },
        {
          minVisits: 3,
          day: ['這條街的磚，跟赤レンガ是同一個時代的。', '橫濱的西洋感，從這裡開始。'],
          night: ['夜晚沒什麼人，磚路的聲音很清楚。', '⋯⋯這裡讓我想到橫濱以前的樣子。'],
        },
        {
          minVisits: 8,
          day: ['來這裡走走，感覺像讀歷史。', '這裡讓我驕傲自己是橫濱人。'],
          night: ['夜晚的馬車道⋯⋯我說不上來為什麼喜歡，但就是喜歡。', '這條路讓人想慢慢走。'],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────
  // 🌿 一般／稀有 ── 安靜系・自然
  // ──────────────────────────────────────────────

  {
    id: 'sankeien',
    name: '三溪園',
    nameJP: '三溪園',
    tier: 'rare',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 10,
    rewards: { mood: 16, affection: 9 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['日本庭園。安靜得有點誇張。', '池子、松樹、老建築⋯⋯有點像世外桃源。'],
          night: ['晚上不開放吧⋯⋯', '黃昏時來的感覺最對。'],
        },
        {
          minVisits: 3,
          day: ['這裡的安靜不是空曠，是沉的那種。', '每次來感覺都在同一個時間。'],
          night: ['這種地方，夜晚一定更安靜。', '⋯⋯能想清楚事情的地方。'],
        },
        {
          minVisits: 8,
          day: ['來這裡不需要說話。你也知道。', '這裡的樹，比我老多了。'],
          night: ['安靜到能聽到自己的呼吸。', '⋯⋯謝謝帶我來這種地方。'],
        },
      ],
    },
  },

  {
    id: 'nogeyama',
    name: '野毛山公園',
    nameJP: '野毛山公園',
    tier: 'normal',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 18,
    rewards: { mood: 14, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['野毛的山頂。有動物園，但那是給小孩的。', '從這裡可以看一點城市。'],
          night: ['夜晚公園的燈很稀。', '⋯⋯城市的燈從這裡看，有點距離感。'],
        },
        {
          minVisits: 3,
          day: ['爬上來，風比較大。不壞。', '這裡的貓很多。我記得。'],
          night: ['夜晚這裡的人很少。喜歡。', '城市的聲音從下面傳來，但這裡安靜。'],
        },
        {
          minVisits: 8,
          day: ['這裡的貓認識我了。你別得意。', '高一點的地方，讓人清楚一點。'],
          night: ['夜晚的野毛山⋯⋯是我自己的地方之一。', '⋯⋯你現在也知道了。'],
        },
      ],
    },
  },

  {
    id: 'yokohamapark',
    name: '橫濱公園',
    nameJP: '横浜公園',
    tier: 'normal',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 18,
    rewards: { mood: 13, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['球場旁邊的公園。比賽日人很多。', '沒比賽的話很安靜。'],
          night: ['夜晚的公園，偶爾有人跑步。', '這種地方，夜晚才是好的。'],
        },
        {
          minVisits: 3,
          day: ['這裡的鬱金香季節很漂亮。你來過嗎。', '不比賽的球場，感覺有點孤獨。'],
          night: ['夜晚這裡的光線很均勻。很平靜。', '⋯⋯不需要做什麼的地方。'],
        },
        {
          minVisits: 8,
          day: ['來這麼多次，我也習慣這裡了。', '這公園很老實。我不討厭老實的地方。'],
          night: ['夜晚的橫濱公園，我喜歡。', '⋯⋯平靜的地方，讓人放心。'],
        },
      ],
    },
  },

  {
    id: 'honmoku',
    name: '本牧山頂公園',
    nameJP: '本牧山頂公園',
    tier: 'rare',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 9,
    rewards: { mood: 15, affection: 8 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['本牧⋯⋯觀光客不來這裡。我喜歡。', '從這裡可以看到東京灣。遠，但在。'],
          night: ['夜晚的海，從這個高度看，像黑色的布。', '靜得嚇人。'],
        },
        {
          minVisits: 3,
          day: ['本牧這一帶，有很深的歷史。你知道嗎。', '這裡的海是不同角度的海。'],
          night: ['夜晚這裡沒有光，只有城市的邊緣在發光。', '⋯⋯能想很多事情的地方。'],
        },
        {
          minVisits: 8,
          day: ['你居然一直跟我來這種地方。', '⋯⋯我不討厭帶你來這裡。'],
          night: ['這裡的夜晚是我的。你也是了，算是。', '這片海，是我的海。⋯⋯你現在也見過了。'],
        },
      ],
    },
  },

  {
    id: 'minatomierugaoka',
    name: '港之見丘公園',
    nameJP: '港の見える丘公園',
    tier: 'normal',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 19,
    rewards: { mood: 15, affection: 8 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['玫瑰很多，觀光客也很多。', '但是確實可以看到港。'],
          night: ['夜晚的港灣，從這裡看很完整。', '這裡比較多情侶。⋯⋯別這樣看我。'],
        },
        {
          minVisits: 3,
          day: ['這裡的玫瑰，每個季節不一樣。', '風景是真的好。我不得不說。'],
          night: ['夜晚的港灣燈光⋯⋯確實漂亮。就這樣。', '⋯⋯這裡的風景很強迫人放鬆。'],
        },
        {
          minVisits: 8,
          day: ['來這麼多次，我幾乎能記住哪朵玫瑰在哪裡了。', '這裡的風景，沒辦法說不好。'],
          night: ['港之見⋯⋯確實名符其實。', '夜晚這裡的港灣景色，我願意承認是美的。'],
        },
      ],
    },
  },

  {
    id: 'negishi',
    name: '根岸森林公園',
    nameJP: '根岸森林公園',
    tier: 'rare',
    preference: 'neutral',
    category: 'nature',
    baseWeight: 8,
    rewards: { mood: 15, affection: 8 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['競馬場的遺跡。歷史的重量不一樣。', '這裡的草坪很大，沒什麼人。'],
          night: ['廢墟在夜晚裡⋯⋯有點沉默的感覺。', '這地方白天才能來，但夜晚的氣氛更特別。'],
        },
        {
          minVisits: 3,
          day: ['舊馬廄的磚還在。有點像赤レンガ，但沒有人在乎。', '這裡的草很長，有種荒廢的美。'],
          night: ['夜晚這裡只有蟲聲。', '⋯⋯很安靜，但不是讓人害怕的安靜。'],
        },
        {
          minVisits: 8,
          day: ['這裡是被時間遺忘的地方。我喜歡。', '不是每個人都知道這裡。你知道了。'],
          night: ['這裡的夜晚，只有我們。', '⋯⋯謝謝你願意來這種地方。'],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────
  // 🏡 稀有 ── 在地人才去的地方
  // ──────────────────────────────────────────────

  {
    id: 'kanazawabunko',
    name: '金澤文庫',
    nameJP: '金沢文庫',
    tier: 'rare',
    preference: 'neutral',
    category: 'historic',
    baseWeight: 8,
    rewards: { mood: 14, affection: 8 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['鎌倉時代的圖書館。⋯⋯有點不真實。', '這裡的文物，沒人在乎，但很重要。'],
          night: ['關館了吧⋯⋯但這一帶傍晚很好走。', '金澤文庫的夜晚，很靜。'],
        },
        {
          minVisits: 3,
          day: ['來這裡的人，都有點認真看歷史的眼神。', '這裡的空氣感覺是舊的。'],
          night: ['傍晚的金澤文庫，讓人想讀書。', '⋯⋯這裡讓我安靜。'],
        },
        {
          minVisits: 8,
          day: ['七百年的知識沉在這裡。', '你每次都跟我來，是真的喜歡歷史？還是喜歡跟我來。⋯⋯不必回答。'],
          night: ['這裡的夜晚，歷史更重。', '⋯⋯和你一起沉默，不需要說話。'],
        },
      ],
    },
  },

  {
    id: 'kanazawahakkei',
    name: '金澤八景',
    nameJP: '金沢八景',
    tier: 'rare',
    preference: 'loved',
    category: 'nature',
    baseWeight: 8,
    rewards: { mood: 19, affection: 14 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: [
            '這裡⋯⋯觀光客不太來。我知道。',
            '八景島的那個八景，原本是說這裡的景色。現在只剩這片安靜。',
          ],
          night: [
            '夜晚這裡，水和天空分不清楚。',
            '⋯⋯這裡的安靜，是我想帶你看的那種安靜。',
          ],
        },
        {
          minVisits: 3,
          day: [
            '帶你來幾次了。你喜歡這裡嗎。⋯⋯算了，我知道你喜歡。',
            '這裡的景色，橫濱人也不一定都來過。我帶你來，你要記住。',
          ],
          night: [
            '夜晚的金澤八景，連聲音都不多。',
            '⋯⋯我帶你來這裡，不是誰都帶的。',
          ],
        },
        {
          minVisits: 8,
          day: [
            '這裡是我的地方之一。現在也是你的。',
            '⋯⋯不需要說什麼，站在這裡就夠了。',
          ],
          night: [
            '夜晚的金澤八景⋯⋯我每次來，都覺得這裡給我充了電。',
            '帶你來這裡這麼多次，你是我最常帶來的人。就你知道就好。',
          ],
        },
      ],
      loved: {
        highAff: [
          '⋯⋯這裡是我的地方。你現在也是了，某種程度上。',
          '這片景色⋯⋯我不是第一次帶人來，但第一次覺得對。',
        ],
      },
    },
  },

  {
    id: 'tsurumi',
    name: '鶴見',
    nameJP: '鶴見',
    tier: 'rare',
    preference: 'neutral',
    category: 'local',
    baseWeight: 7,
    rewards: { mood: 12, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['橫濱的北邊。很在地。', '不觀光，就是生活的地方。'],
          night: ['夜晚的鶴見，下了班的人在街上。', '生活感很重，我喜歡。'],
        },
        {
          minVisits: 3,
          day: ['這裡的總持寺，很有分量。', '鶴見是有根的地方。'],
          night: ['這裡的居酒屋，是老派的那種。', '⋯⋯讓人想喝一杯，慢慢喝。'],
        },
        {
          minVisits: 8,
          day: ['這裡的人不裝，我喜歡。', '帶你來這種地方，你不嫌棄吧。⋯⋯好。'],
          night: ['鶴見的夜晚，是真實的橫濱。', '⋯⋯謝謝你不覺得這裡無聊。'],
        },
      ],
    },
  },

  {
    id: 'konandai',
    name: '港南台',
    nameJP: '港南台',
    tier: 'rare',
    preference: 'neutral',
    category: 'local',
    baseWeight: 7,
    rewards: { mood: 11, affection: 6 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['住宅區。普通。', '這裡的公園很多。'],
          night: ['夜晚的住宅街，燈都是同一種黃。', '這裡的人，在自己家裡。'],
        },
        {
          minVisits: 3,
          day: ['這種地方，是大多數人的橫濱。', '平靜，踏實。'],
          night: ['住宅街的夜晚，每家窗戶裡有人。', '⋯⋯這種普通，其實不容易。'],
        },
        {
          minVisits: 8,
          day: ['帶你來這種地方，是想讓你看橫濱的另一面。', '不是風景，是生活。'],
          night: ['這裡的夜晚讓我想著，什麼叫做有個家。', '⋯⋯沒什麼，走了。'],
        },
      ],
    },
  },

  // ──────────────────────────────────────────────
  // 🎡 稀有 ── 特殊點・彩蛋
  // ──────────────────────────────────────────────

  {
    id: 'cupnoodles',
    name: '杯麵博物館',
    nameJP: 'カップヌードルミュージアム',
    tier: 'rare',
    preference: 'disliked',
    category: 'tourist',
    baseWeight: 6,
    rewards: { mood: -5, affection: 2 }, // 去了心情扣，但好感微加（他還是去了）
    dislikedProgression: [
      {
        displeasure: 0,
        text: '⋯⋯杯麵博物館？你認真的？這是觀光客去的地方。算了，你要去就去。',
      },
      {
        displeasure: 1,
        text: '又來這裡？看那些人排隊做杯麵⋯⋯拜託，這是我家附近。我不需要做體驗。',
      },
      {
        displeasure: 2,
        text: '你是認真在測試我嗎。第三次了。再帶我來一次，你自己想清楚後果。',
      },
      {
        displeasure: 3,
        isRefusal: true,
        text: '不去。杯麵博物館不去。你自己去。我在這裡等你。',
      },
    ],
    petition: {
      prompt: '⋯⋯求他去看看？',
      success: [
        '我說不去的⋯⋯算了，就這次。下次再帶我來，別怪我。',
        '⋯⋯真是拿你沒辦法。就這一次。',
      ],
      fail: [
        '不去就是不去。你臉怎麼樣都沒用。',
        '說了不去。是說你聽不懂，還是覺得好看？',
      ],
    },
  },

  {
    id: 'hammerhead',
    name: '橫濱 Hammerhead',
    nameJP: '横浜ハンマーヘッド',
    tier: 'rare',
    preference: 'neutral',
    category: 'waterfront',
    baseWeight: 8,
    rewards: { mood: 13, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['舊碼頭改建的。做得不壞。', '這裡的クレーン保留下來了，有想法。'],
          night: ['夜晚的碼頭，有點工業感。', '倉庫改成餐廳，但還有碼頭的骨架。'],
        },
        {
          minVisits: 3,
          day: ['這裡的設計比赤レンガ新，但有在用心。', '港口能保留就保留，這樣想的人有品味。'],
          night: ['夜晚這裡的海風是直的。', '⋯⋯這裡還行，我收回之前說的「不壞」，是真的不壞。'],
        },
        {
          minVisits: 8,
          day: ['來幾次了，這地方有在進步。', '橫濱的港口，沒有一個讓我失望的。'],
          night: ['夜晚的 Hammerhead⋯⋯有自己的態度。', '我對這裡有好感了。就這樣。'],
        },
      ],
    },
  },

  {
    id: 'dolls',
    name: '橫濱人形之家',
    nameJP: '横浜人形の家',
    tier: 'rare',
    preference: 'neutral',
    category: 'museum',
    baseWeight: 7,
    rewards: { mood: 11, affection: 7 },
    dialogues: {
      visit: [
        {
          minVisits: 0,
          day: ['世界的娃娃收藏在這裡。⋯⋯有點詭異。', '但認真做的東西值得尊重，就算是娃娃。'],
          night: ['這種地方夜晚不開吧⋯⋯白天也夠奇特了。', '娃娃的眼睛在夜晚想到就⋯⋯算了。'],
        },
        {
          minVisits: 3,
          day: ['再來⋯⋯你是真的喜歡這種地方。', '這裡的展品很認真。我承認。'],
          night: ['⋯⋯這裡的娃娃，每個都有故事吧。', '比我想的有深度。'],
        },
        {
          minVisits: 8,
          day: ['帶我來這裡這麼多次，我開始懂為什麼了。', '⋯⋯世界各地的人做的東西，放在一起，有點感動。'],
          night: ['夜晚想到這裡的娃娃⋯⋯不要再說了。', '⋯⋯但確實，這裡值得來。'],
        },
      ],
    },
  },

  {
    id: 'hakkeijima',
    name: '橫濱八景島海島樂園',
    nameJP: '横浜・八景島シーパラダイス',
    tier: 'rare',
    preference: 'disliked',
    category: 'tourist',
    baseWeight: 6,
    rewards: { mood: -8, affection: 2 },
    dislikedProgression: [
      {
        displeasure: 0,
        text: '⋯⋯遊樂園？我是這種人嗎。算了，來了就來了，你高興就好。但我不坐那個雲霄飛車。',
      },
      {
        displeasure: 1,
        text: '又來這裡？我上次說的你沒聽？人這麼多，叫聲這麼大⋯⋯你欠我一次野毛居酒屋。',
      },
      {
        displeasure: 2,
        text: '我說，你是不是故意的。再帶我來一次，我要在這裡把你的手放開，你自己找路回去。',
      },
      {
        displeasure: 3,
        isRefusal: true,
        text: '不去。說定了不去。什麼表情都沒用。你要去，自己去。',
      },
    ],
    petition: {
      prompt: '⋯⋯求求他？',
      success: [
        '⋯⋯（長嘆氣）就這次。只有這次。野毛居酒屋的債，你記著。',
        '我去。但我不笑，不拍照，不玩任何一個設施。說好了。',
      ],
      fail: [
        '不去就是不去。你再說一遍我也不去。',
        '我的答案不會變。',
      ],
    },
  },
]

// ═══════════════════════════════════════════════
// 散步事件池
// ═══════════════════════════════════════════════

export const WALK_EVENTS = [
  // 食物類
  {
    id: 'event_food_onigiri',
    type: 'food',
    weight: 25,
    text: '路上看到一家便利商店特賣，買了飯糰。',
    item: { id: 'onigiri', name: '飯糰', type: 'balanced' },
    effect: {},
  },
  {
    id: 'event_food_canned',
    type: 'food',
    weight: 15,
    text: '自動販賣機旁邊有人忘了拿的罐裝黑咖啡。Toki 撿起來看了一眼。「浪費。」',
    item: { id: 'black_coffee', name: '黑咖啡', type: 'balanced' },
    effect: {},
  },
  {
    id: 'event_food_manjuu',
    type: 'food',
    weight: 10,
    categories: ['waterfront', 'historic', 'shopping'],
    text: '路邊的老店門口在試吃。Toki 走過去拿了一個，沒說話，走了。',
    item: { id: 'manjuu', name: '饅頭', type: 'junk', sat: 8, hlt: -3, moo: 5 },
    effect: {},
  },

  // 對話類
  {
    id: 'event_talk_cat',
    type: 'dialogue',
    weight: 20,
    text: '路上遇到一隻貓。Toki 蹲下來看了很久，貓不理他。「⋯⋯跩。」他還是多看了兩眼。',
    effect: { mood: 5 },
  },
  {
    id: 'event_talk_rain',
    type: 'dialogue',
    weight: 15,
    categories: ['waterfront', 'nature'],
    text: '突然飄了一點小雨。Toki 看了看天，沒撐傘。「下就下。」',
    effect: { mood: 3, affection: 2 },
  },
  {
    id: 'event_talk_night_sky',
    type: 'dialogue',
    nightOnly: true,
    weight: 20,
    text: '⋯⋯他停下來看了一會兒夜空。沒有說話。你也沒有說話。這一分鐘很長。',
    effect: { mood: 8, affection: 4 },
  },
  {
    id: 'event_talk_memory',
    type: 'dialogue',
    weight: 10,
    text: '「這條路我以前走過。⋯⋯很久以前的事了。」他沒有繼續說。',
    effect: { mood: 3, affection: 5 },
  },
  {
    id: 'event_talk_song',
    type: 'dialogue',
    weight: 8,
    text: '他突然哼了兩句什麼，發現你在聽，馬上停了。「你沒聽到。」',
    effect: { mood: 6, affection: 6 },
  },

  // 心情微變動類
  {
    id: 'event_mood_crowd',
    type: 'mood',
    weight: 18,
    text: '前面突然很多人。Toki 皺了一下眉，悄悄換了方向走。',
    effect: { mood: -3 },
  },
  {
    id: 'event_mood_wind',
    type: 'mood',
    weight: 22,
    categories: ['waterfront', 'nature'],
    text: '海風很大，有點冷。Toki 把衣領拉了拉，看了你一眼，沒說話。',
    effect: { mood: 4 },
  },
  {
    id: 'event_mood_sunset',
    type: 'mood',
    weight: 12,
    text: '傍晚的光打在建築上，橘色的。Toki 放慢了腳步。「⋯⋯還行。」',
    effect: { mood: 7 },
  },
  {
    id: 'event_mood_train',
    type: 'mood',
    weight: 15,
    text: '電車從高架橋上經過，聲音很大。他等聲音停了，才繼續說話。',
    effect: { mood: 0 },
  },
]
