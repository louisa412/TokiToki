export const CHARACTERS = [
  {
    id: 'toki',
    name: 'Toki',
    tagline: '傲嬌電子寵物',
    available: true,
  },
]

// 選角畫面要顯示的鎖定佔位格數（不含已解鎖角色）
export const LOCKED_SLOTS = 2

export function getCharacterName(id) {
  return CHARACTERS.find(c => c.id === id)?.name ?? id
}
