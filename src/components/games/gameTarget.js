export function isIchiroGame(store) {
  return store.activeGameTarget === 'ichiro'
}

export function gameTargetName(store) {
  return isIchiroGame(store) ? store.activeVisitorName : store.tokiName
}

export function gameLine(store, tokiLine, ichiroLine) {
  return isIchiroGame(store) ? ichiroLine : tokiLine
}

export function gameMsgs(store, tokiMsgs, ichiroMsgs) {
  return isIchiroGame(store) ? ichiroMsgs : tokiMsgs
}
