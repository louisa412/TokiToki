<template>
  <div id="foodGrid">
    <div class="target-note">{{ targetNote }}</div>

    <!-- ── 散步戰利品 ── -->
    <div v-if="target === 'toki' && store.inventory.length > 0" class="inventory-section">
      <div class="inventory-label">🎒 散步撿到的</div>
      <div class="food-grid">
        <button
          v-for="(item, index) in store.inventory"
          :key="index"
          class="food-btn"
          :disabled="isActionDisabled"
          @click="handleInventory(index, item.id)"
        >
          <span class="fi">{{ getFoodDef(item.id)?.ico || '🎁' }}</span>
          <div>
            <div class="fn">{{ item.name }}</div>
          </div>
        </button>
      </div>
    </div>

    <!-- ── 一般食物 ── -->
    <div class="food-grid">
      <button
        v-for="f in visibleFoodCards"
        :key="f.id"
        class="food-btn"
        :class="{ 'food-night': f.nightOnly, 'food-duo': f.duoOnly, 'food-locked': f.duoOnly && !store.hasActiveVisitor }"
        :disabled="isActionDisabled"
        @click="handle(f.id)"
      >
        <span class="fi">{{ f.ico }}</span>
        <div>
          <div class="fn">{{ f.name }}</div>
          <div class="fs">
            <template v-if="f.preview.sat > 0">🍖+{{ f.preview.sat }} </template>
            <template v-if="f.preview.hlt > 0"> 💊+{{ f.preview.hlt }}</template>
            <template v-if="f.preview.hlt < 0"> 💊{{ f.preview.hlt }}</template>
            <template v-if="f.preview.sta > 0"> ⚡+{{ f.preview.sta }}</template>
            <template v-if="f.preview.sta < 0"> ⚡{{ f.preview.sta }}</template>
            <template v-if="f.preview.moo > 0"> 💢+{{ f.preview.moo }}</template>
            <template v-if="f.preview.moo < 0"> 💢{{ f.preview.moo }}</template>
            <template v-if="f.preview.aff > 0"> 💙+{{ f.preview.aff }}</template>
            <template v-if="f.preview.aff < 0"> 💙{{ f.preview.aff }}</template>
            <template v-if="f.preview.rel > 0"> 💞+{{ f.preview.rel }}</template>
            <template v-if="f.healthFood"> <span class="health-food-tag">健康</span></template>
            <template v-if="f.duoOnly"> <span class="duo-food-tag">雙人</span></template>
          </div>
        </div>
      </button>
    </div>

    <div v-if="!store.nightMode && hasNightFoods" class="night-hint">
      🌙 深夜限定食物夜間才會出現
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore, FOODS, ICHIRO_FOOD_PREFS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])
const props = defineProps({
  target: { type: String, default: 'toki' }
})

const hasNightFoods = FOODS.some(f => f.nightOnly)

const target = computed(() => props.target)
const isActionDisabled = computed(() => store.reacting || store.targetIsSleeping(props.target))
const targetNote = computed(() => {
  if (props.target === 'ichiro') return '餵食 Ichiro'
  if (props.target === 'duo') return 'Toki 和 Ichiro 的雙人食物'
  return '餵食 Toki'
})

const visibleFoods = computed(() => {
  return FOODS.filter(f => {
    if (f.nightOnly && !store.nightMode) return false
    if (props.target === 'duo') return f.duoOnly
    return !f.duoOnly
  })
})

const visibleFoodCards = computed(() => {
  return visibleFoods.value.map(f => ({
    ...f,
    preview: getFoodPreview(f)
  }))
})

function getFoodPreview(f) {
  const preview = {
    sat: f.sat || 0,
    hlt: f.hlt || 0,
    sta: f.sta || 0,
    moo: f.moo || 0,
    aff: f.aff || 0,
    rel: f.rel || 0
  }

  if (props.target === 'ichiro') {
    const pref = ICHIRO_FOOD_PREFS[f.id]
    if (pref) {
      preview.moo = pref.moo || 0
      preview.aff = pref.aff || 0
      return preview
    }
    if (f.healthFood) {
      const tier = store.playerAffinityIchiro >= 200 ? 2 : store.playerAffinityIchiro >= 100 ? 1 : 0
      preview.moo = f.mooTiers?.[tier] || 0
      preview.aff = f.affTiers?.[tier] || 0
      return preview
    }
  }

  if (props.target === 'toki' && f.healthFood) {
    const tier = store.playerAffinityToki >= 200 ? 2 : store.playerAffinityToki >= 100 ? 1 : 0
    preview.moo = f.mooTiers?.[tier] || 0
    preview.aff = f.affTiers?.[tier] || 0
  }

  return preview
}

function getFoodDef(id) {
  return FOODS.find(f => f.id === id)
}

function handle(id) {
  store.recordClick()
  const result = store.doFood(id, props.target)
  if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  } else if (result === 'need_visitor') {
    emit('toast', { msg: '這個要 Ichiro 來訪時才能用', type: 'blue' })
  } else if (result === 'duo_only') {
    emit('toast', { msg: '這是雙人食物', type: 'blue' })
  } else if (result === 'single_only') {
    emit('toast', { msg: '這是單人食物', type: 'blue' })
  } else if (result === 'sleeping') emitSleepToast()
}

function handleInventory(index, foodId) {
  store.recordClick()
  // 先從庫存移除，再餵食
  store.inventory.splice(index, 1)
  store.save()
  const result = store.doFood(foodId)
  if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  } else if (result === 'need_visitor') {
    emit('toast', { msg: '這個要 Ichiro 來訪時才能用', type: 'blue' })
  } else if (result === 'sleeping') {
    emit('toast', { msg: 'Toki 正在睡', type: 'blue' })
  }
}

function emitSleepToast() {
  if (props.target === 'duo') emit('toast', { msg: '有人正在睡，雙人食物暫停', type: 'blue' })
  else emit('toast', { msg: `${props.target === 'ichiro' ? 'Ichiro' : 'Toki'} 正在睡`, type: 'blue' })
}
</script>
