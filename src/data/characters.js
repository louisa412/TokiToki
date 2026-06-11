export const CHARACTERS = [
  {
    id: 'toki',
    name: 'Toki',
    tagline: '傲嬌電子寵物',
    available: true,
  },
  {
    id: 'kyouji',
    name: 'Kyouji',
    tagline: '輕浮的黑道大叔',
    available: true,
  },
  {
    id: 'satomi',
    name: 'Satomi',
    tagline: '羞澀的文藝少年',
    available: true,
  },
  {
    id: 'ichiro',
    name: 'Ichiro',
    tagline: '體貼的鄰家青年',
    available: true,
  },
]

// 選角畫面要顯示的鎖定佔位格數（不含已解鎖角色）
export const LOCKED_SLOTS = 0

export function getCharacterName(id) {
  return CHARACTERS.find(c => c.id === id)?.name ?? id
}
