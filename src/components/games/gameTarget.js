export function isIchiroGame(store) {
  return store.activeGameTarget === 'ichiro'
}

export function gameTargetName(store) {
  return isIchiroGame(store) ? store.activeVisitorName : store.tokiName
}

export function gameTargetInitial(store) {
  return (gameTargetName(store) || '?').slice(0, 1).toUpperCase()
}

export function formatGameText(store, text) {
  if (typeof text !== 'string') return text
  const petName = store.tokiName || 'Toki'
  const visitorName = store.activeVisitorName || '訪客'
  const targetName = gameTargetName(store)
  return text
    .replace(/\{target\}/g, targetName)
    .replace(/\{pet\}/g, petName)
    .replace(/\{visitor\}/g, visitorName)
    .replace(/\bToki\b/g, petName)
    .replace(/\bIchiro\b/g, visitorName)
}

export function gameLine(store, tokiLine, ichiroLine) {
  return formatGameText(store, isIchiroGame(store) ? ichiroLine : tokiLine)
}

export function gameMsgs(store, tokiMsgs, ichiroMsgs) {
  return (isIchiroGame(store) ? ichiroMsgs : tokiMsgs).map(msg => formatGameText(store, msg))
}
