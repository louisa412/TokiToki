import tokiData   from './toki.js'
import kyoujiData  from './kyouji.js'
import satomiData  from './satomi.js'
import ichiroData  from './ichiro.js'

const _chars = [tokiData, kyoujiData, satomiData, ichiroData]

export const CHARACTERS    = _chars.map(({ id, name, tagline, available }) => ({ id, name, tagline, available }))
export const LOCKED_SLOTS  = 0
export const CHARACTER_MAP = Object.fromEntries(_chars.map(c => [c.id, c]))

export const CHARACTER_DIALOGUE = Object.fromEntries(_chars.map(c => [c.id, c.dialogue]))

export function getCharacterName(id) {
  return CHARACTER_MAP[id]?.name ?? id
}

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
