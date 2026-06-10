<template>
  <div class="stats" :class="{ duo: store.hasActiveVisitor }">
    <!-- 日數倒數 -->
    <div class="days-row">
      <span class="days-label">第 {{ store.adoptedDays + 1 }} 天</span>
      <span class="days-sep">・</span>
      <span v-if="store.daysLeft > 0" class="days-left" :class="{ urgent: store.daysLeft <= 3 }">
        還有 {{ store.daysLeft }} 天
      </span>
      <span v-else class="days-left urgent blink">今天要離開了</span>
    </div>

    <template v-if="!store.hasActiveVisitor">
      <div v-if="store.isSick" class="sick-badge">🤒 Toki 感冒中</div>
      <div class="sr" v-for="s in tokiRows" :key="s.id">
        <div class="sl">{{ s.ico }}<br><span class="sl-txt">{{ s.label }}</span></div>
        <div class="bbg" :class="{ 'sick-bar': s.id === 'hlt' && store.isSick }">
          <div
            class="bar"
            :class="[s.colorClass, { low: s.value < 25 }]"
            :style="{ width: s.pct + '%' }"
          ></div>
        </div>
        <div class="sn">{{ s.value }}</div>
      </div>
    </template>

    <template v-else>
      <div class="duo-stat-grid">
        <div class="duo-stat-card">
          <div class="duo-stat-name">Toki</div>
          <div v-if="store.isSick" class="mini-sick">感冒中</div>
          <div class="duo-sr" v-for="s in tokiRows" :key="s.id">
            <span class="duo-sl">
              <span class="duo-ico">{{ s.ico }}</span>
              <span class="duo-label">{{ s.label }}</span>
            </span>
            <div class="bbg" :class="{ 'sick-bar': s.id === 'hlt' && store.isSick }">
              <div
                class="bar"
                :class="[s.colorClass, { low: s.value < 25 }]"
                :style="{ width: s.pct + '%' }"
              ></div>
            </div>
            <span class="duo-sn">{{ s.value }}</span>
          </div>
        </div>
        <div class="duo-stat-card">
          <div class="duo-stat-name">Ichiro</div>
          <div class="duo-sr" v-for="s in ichiroRows" :key="s.id">
            <span class="duo-sl">
              <span class="duo-ico">{{ s.ico }}</span>
              <span class="duo-label">{{ s.label }}</span>
            </span>
            <div class="bbg">
              <div
                class="bar"
                :class="[s.colorClass, { low: s.value < 25 }]"
                :style="{ width: s.pct + '%' }"
              ></div>
            </div>
            <span class="duo-sn">{{ s.value }}</span>
          </div>
        </div>
      </div>
      <div class="relationship-strip">
        <span class="relationship-info">
          <span class="relationship-pair">💞 Toki × Ichiro</span>
          <span class="relationship-title">{{ store.relationshipTitle }}</span>
        </span>
        <div class="bbg">
          <div class="bar rel" :style="{ width: relationshipPct + '%' }"></div>
        </div>
        <strong>{{ Math.round(store.relationshipTokiIchiro) }}</strong>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'

const store = usePetStore()

const tokiRows = computed(() => [
  { id: 'sat', ico: '🍖', label: '飽食', colorClass: 'sat', value: Math.round(store.sat), pct: Math.round(store.sat) },
  { id: 'hlt', ico: '💊', label: '健康', colorClass: 'hlt', value: Math.round(store.hlt), pct: Math.round(store.hlt) },
  { id: 'sta', ico: '⚡', label: '體力', colorClass: 'sta', value: Math.round(store.sta), pct: Math.round(store.sta) },
  { id: 'moo', ico: '💢', label: '心情', colorClass: 'moo', value: Math.round(store.moo), pct: Math.round(store.moo) },
  {
    id: 'aff', ico: '💙', label: '好感', colorClass: 'aff',
    value: Math.round(store.playerAffinityToki),
    pct:   Math.min(Math.round(store.playerAffinityToki / 3), 100)
  }
])

const ichiroRows = computed(() => [
  { id: 'satIchiro', ico: '🍖', label: '飽食', colorClass: 'sat', value: Math.round(store.satIchiro), pct: Math.round(store.satIchiro) },
  { id: 'hltIchiro', ico: '💊', label: '健康', colorClass: 'hlt', value: Math.round(store.hltIchiro), pct: Math.round(store.hltIchiro) },
  { id: 'staIchiro', ico: '⚡', label: '體力', colorClass: 'sta', value: Math.round(store.staIchiro), pct: Math.round(store.staIchiro) },
  { id: 'mooIchiro', ico: '💢', label: '心情', colorClass: 'moo', value: Math.round(store.mooIchiro), pct: Math.round(store.mooIchiro) },
  {
    id: 'affIchiro', ico: '💙', label: '好感', colorClass: 'aff',
    value: Math.round(store.playerAffinityIchiro),
    pct: Math.min(Math.round(store.playerAffinityIchiro / 3), 100)
  }
])

const relationshipPct = computed(() => Math.min(Math.round(store.relationshipTokiIchiro / 3), 100))
</script>
