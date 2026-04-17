<template>
  <Teleport to="body">
    <div class="checkup-overlay" v-if="store.checkupActive">
      <div class="checkup-card">

        <!-- 進度點 -->
        <div class="checkup-dots">
          <span class="ck-dot" :class="{ active: phase >= 0, past: phase > 0 }"></span>
          <span class="ck-dash">──</span>
          <span class="ck-dot" :class="{ active: phase >= 1, past: phase > 1 }"></span>
          <span class="ck-dash">──</span>
          <span class="ck-dot" :class="{ active: phase >= 2 }"></span>
        </div>

        <!-- 地點標籤 -->
        <div class="checkup-location">📍 {{ locationLabel }}</div>

        <!-- 台詞 -->
        <div class="checkup-bubble" :class="{ 'ck-in': msgVisible }">
          <span class="ck-speaker">Toki ：</span>
          <span class="ck-text">「{{ currentMsg }}」</span>
        </div>

        <!-- 等待進度條（第二幕） -->
        <div v-if="phase === 1" class="ck-wait">
          <div class="ck-wait-bar">
            <div class="ck-wait-fill" :style="{ width: waitPct + '%' }"></div>
          </div>
          <span class="ck-wait-label">等待結果中...</span>
        </div>

        <!-- 結果（第三幕） -->
        <div v-if="phase === 2" class="ck-result" :class="resultClass">
          {{ resultLabel }}
        </div>

        <!-- 離開按鈕（第三幕才出現） -->
        <button v-if="phase === 2" class="ck-leave" @click="finish">
          離開診所
        </button>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { usePetStore } from '../stores/pet'

const store = usePetStore()

const phase      = ref(0)
const currentMsg = ref('')
const msgVisible = ref(false)
const waitPct    = ref(0)

const timers = []
const t = (fn, ms) => { const id = setTimeout(fn, ms); timers.push(id); return id }

// 每個 phase 的地點
const locationLabel = computed(() => ['診所門口', '候診室', '診療室'][phase.value] ?? '診療室')

// 結果標籤 + 樣式
const resultLabel = computed(() => {
  const tier = store.checkupTier
  if (tier === 'good') return '✅ 各項數值正常'
  if (tier === 'ok')   return '⚠️ 部分數值需注意'
  return '🔴 多項數值偏低'
})
const resultClass = computed(() => ({
  'ck-good': store.checkupTier === 'good',
  'ck-ok':   store.checkupTier === 'ok',
  'ck-bad':  store.checkupTier === 'bad'
}))

// 各階段台詞
const ACT = {
  0: ['...去了。你陪我。', '...別在那邊發呆。走了。', '...就去一下。'],
  1: ['...結果還沒出來。安靜。', '...等一下。別問我緊不緊張。', '...叫我的時候再說。'],
  good: ['...沒問題。我就說了。', '全部正常。這是當然的。', '...嗯。健康。當然。'],
  ok:   ['...要注意飲食。（他不看你）', '有幾項要改善。...聽到了。', '沒大問題。注意點就好。'],
  bad:  ['...有幾項數值偏低。（沉默）', '...你不要說什麼。我知道了。', '醫生說要好好吃飯。（他沉默了很久）']
}
const rnd = arr => arr[Math.floor(Math.random() * arr.length)]

function showMsg(msgs) {
  msgVisible.value = false
  currentMsg.value = rnd(msgs)
  t(() => { msgVisible.value = true }, 200)
}

function startSequence() {
  // 第一幕：門口
  phase.value = 0
  showMsg(ACT[0])

  // 第二幕：候診室（3s 後）
  t(() => {
    phase.value = 1
    showMsg(ACT[1])
    // 進度條動畫
    waitPct.value = 0
    t(() => { waitPct.value = 100 }, 100)
  }, 3000)

  // 第三幕：結果（3+3.8s 後）
  t(() => {
    phase.value = 2
    const tier = store.checkupTier || 'ok'
    showMsg(ACT[tier])
  }, 6800)
}

// 監聽 modal 開啟
watch(() => store.checkupActive, (val) => {
  if (val) {
    phase.value   = 0
    waitPct.value = 0
    msgVisible.value = false
    startSequence()
  }
})

function finish() {
  store.closeCheckup()
}

onUnmounted(() => timers.forEach(clearTimeout))
</script>
