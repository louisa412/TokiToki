<template>
  <Teleport to="body">
    <div class="splash-overlay" :class="{ 'splash-out': leaving }" @click="dismiss">
      <div class="splash-body">
        <div class="splash-logo">T O K I<br>T O K I</div>
        <div class="splash-divider">────────────</div>
        <div class="splash-duration">{{ durationLabel }}</div>
        <div class="splash-msg">「{{ msg }}」</div>
        <div class="splash-skip">tap to continue</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props  = defineProps({ elapsed: { type: Number, required: true } })
const emit   = defineEmits(['done'])
const leaving = ref(false)

// 依離開時長選台詞
const MSGS = {
  short: [   // 3–8h
    '...你回來了。',
    '等了一會。不是說在等你。',
    '你不在的時候時間比較慢。',
    '...就知道你會回來。'
  ],
  mid: [     // 8–24h
    '你去哪了。這麼久。',
    '...我有點擔心。只是有點。',
    '算了。你回來了就好。',
    '...一整天了。'
  ],
  long: [    // 24h+
    '...終於。',
    '我還以為你不會再來了。',
    '時間過得很慢，你不在的時候。這句話，我想了很久。',
    '...你還記得我。'
  ]
}

const tier = computed(() => {
  if (props.elapsed >= 86400) return 'long'
  if (props.elapsed >= 28800) return 'mid'
  return 'short'
})

const durationLabel = computed(() => {
  const h = Math.floor(props.elapsed / 3600)
  const m = Math.round((props.elapsed % 3600) / 60)
  if (h >= 24) return `${Math.floor(h / 24)}天${h % 24 > 0 ? h % 24 + '小時' : ''}後`
  if (h > 0)   return `${h}小時${m > 0 ? m + '分' : ''}後`
  return `${m}分鐘後`
})

const msgs = MSGS[tier.value]
const msg  = msgs[Math.floor(Math.random() * msgs.length)]

function dismiss() {
  leaving.value = true
  setTimeout(() => emit('done'), 500)
}

onMounted(() => {
  // 4 秒後自動淡出
  setTimeout(dismiss, 4000)
})
</script>
