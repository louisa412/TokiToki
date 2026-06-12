// ── 相遇記憶定義 ─────────────────────────────────────────────────────────────
// 這裡只定義「有哪些可解鎖的記憶」。玩家實際取得的 memory records 存在
// charactersState[characterId].memories（見 src/systems/memorySystem.js）。
// localStorage 只存 record（id / characterId / acquiredAt / day / snapshot），
// 標題與文案顯示時才從這裡組出來。

// 好感（0-300 制）達到此門檻時解鎖 highAffinity 記憶
export const HIGH_AFFINITY_THRESHOLD = 150

export const MEMORY_DEFINITIONS = {
  firstPat: {
    id: 'firstPat',
    type: 'interaction',
    title: '第一次摸頭',
    rarity: 'common',
    trigger: 'first_pat',
    cardStyle: 'soft',
    cardStyleOverrides: { kyouji: 'dark' },
    spriteMood: 'shy',
    textTemplates: {
      toki: '你第一次摸了 Toki 的頭。他嘴上嫌麻煩，卻沒有躲開。',
      kyouji: '你第一次摸了 Kyouji 的頭。他僵住了一下，嘴上嫌麻煩，卻沒有真的躲開。',
      satomi: '你第一次輕輕摸了 Satomi 的頭。他低下眼，像是把那份溫度收進心裡。',
      ichiro: '你第一次摸了 Ichiro 的頭。他笑得有點不好意思，卻很溫柔地接受了。'
    },
    fallbackText: '你第一次摸了他的頭。你們留下了一段小小的日常記憶。'
  },

  firstFullSleep: {
    id: 'firstFullSleep',
    type: 'sleep',
    title: '第一次睡滿',
    rarity: 'common',
    trigger: 'first_full_sleep',
    cardStyle: 'soft',
    spriteMood: 'sleeping',
    textTemplates: {
      toki: 'Toki 第一次在你身邊睡滿了八小時。醒來時他說只是剛好想睡，但表情明顯放鬆了。',
      kyouji: 'Kyouji 第一次安穩地睡滿了八小時。醒來時他伸了個懶腰，難得沒有說廢話。',
      satomi: 'Satomi 第一次在這裡睡滿了八小時。醒來時他小聲說，好像很久沒睡得這麼好了。',
      ichiro: 'Ichiro 第一次睡滿了八小時。醒來時他笑著說，這裡讓人很安心。'
    },
    fallbackText: '他第一次在你身邊安穩地睡滿了一整晚。'
  },

  firstSickRecovery: {
    id: 'firstSickRecovery',
    type: 'care',
    title: '第一次康復',
    rarity: 'uncommon',
    trigger: 'first_sick_recovery',
    cardStyle: 'warm',
    spriteMood: 'happy',
    textTemplates: {
      toki: 'Toki 第一次從生病中康復。他說自己本來就沒事，卻記得是誰一直待在旁邊。',
      kyouji: 'Kyouji 第一次從生病中康復。他笑著說小感冒而已，眼神卻比平常柔和。',
      satomi: 'Satomi 第一次從生病中康復。他抱著毯子小聲說了謝謝。',
      ichiro: 'Ichiro 第一次從生病中康復。他說，有人照顧的感覺原來是這樣。'
    },
    fallbackText: '他第一次從生病中康復，而你一直陪在旁邊。'
  },

  firstLateNight: {
    id: 'firstLateNight',
    type: 'night',
    title: '第一次深夜陪伴',
    rarity: 'uncommon',
    trigger: 'first_late_night',
    cardStyle: 'night',
    spriteMood: 'heart',
    textTemplates: {
      toki: '深夜，你們第一次一起待著。Toki 沒說什麼，但他沒有趕你走。',
      kyouji: '深夜，你們第一次一起待著。Kyouji 難得安靜，菸都忘了點。',
      satomi: '深夜，你們第一次一起待著。Satomi 望著窗外，輕聲說夜裡其實沒那麼可怕。',
      ichiro: '深夜，你們第一次一起待著。Ichiro 泡了兩杯熱飲，把其中一杯推給你。'
    },
    fallbackText: '深夜，你們第一次一起安靜地待著。'
  },

  highAffinity: {
    id: 'highAffinity',
    type: 'bond',
    title: '心的距離',
    rarity: 'rare',
    trigger: 'high_affinity',
    threshold: HIGH_AFFINITY_THRESHOLD,
    cardStyle: 'special',
    spriteMood: 'heart',
    textTemplates: {
      toki: '不知道從什麼時候開始，Toki 已經把你當成夥伴了。雖然他絕對不會承認。',
      kyouji: '不知道從什麼時候開始，Kyouji 看你的眼神認真了起來。他說，你還挺有意思的。',
      satomi: '不知道從什麼時候開始，Satomi 在你面前不再那麼緊張了。他說，跟你在一起很自在。',
      ichiro: '不知道從什麼時候開始，Ichiro 把這裡當成了另一個家。他說，謝謝你願意接住他。'
    },
    fallbackText: '不知道從什麼時候開始，你們之間的距離變得很近了。'
  },

  departure: {
    id: 'departure',
    type: 'farewell',
    title: '十四天的相遇',
    rarity: 'rare',
    trigger: 'departure',
    cardStyle: 'farewell',
    spriteMood: 'heart',
    textTemplates: {
      toki: '十四天過去了。Toki 背起包包，說別露出那種臉，又不是不會再見。',
      kyouji: 'Kyouji 在門口停了一下，回頭笑著說：別想我想太久啊。然後他走進了人群。',
      satomi: 'Satomi 把一張寫了字的紙條留在桌上，深深鞠了一躬。這十四天，他會一直記得。',
      ichiro: 'Ichiro 認真地說了謝謝，又說了再見。他揮手的樣子，跟第一天來的時候一樣溫柔。'
    },
    fallbackText: '十四天的相遇結束了。這段時間，會變成你們共同的回憶。'
  }
}
