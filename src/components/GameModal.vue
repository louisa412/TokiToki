<template>
  <Teleport to="body">
    <div class="game-modal" :class="{ open: store.inGame }" @click.self="tryClose">
      <div class="modal-inner">
        <div class="modal-hdr">
          <span class="modal-title">{{ gameTitle }}</span>
          <button class="modal-close" @click="tryClose">✕</button>
        </div>
        <div class="game-area">
          <component :is="currentGame" v-if="store.inGame && currentGame" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { usePetStore } from '../stores/pet'
import { GAMES } from '../stores/pet'

const store = usePetStore()

// Lazy-load each game component
const GAME_COMPONENTS = {
  rps:    defineAsyncComponent(() => import('./games/RpsGame.vue')),
  stare:  defineAsyncComponent(() => import('./games/StareGame.vue')),
  rap:    defineAsyncComponent(() => import('./games/RapGame.vue')),
  coin:   defineAsyncComponent(() => import('./games/CoinGame.vue')),
  shoot:  defineAsyncComponent(() => import('./games/ShootGame.vue')),
  polish: defineAsyncComponent(() => import('./games/PolishGame.vue')),
  walk:   defineAsyncComponent(() => import('./games/WalkGame.vue')),
  listen: defineAsyncComponent(() => import('./games/ListenGame.vue'))
}

const currentGame = computed(() =>
  store.activeGameId ? GAME_COMPONENTS[store.activeGameId] : null
)

const gameTitle = computed(() => {
  const g = GAMES.find(g => g.id === store.activeGameId)
  return g ? `${g.ico} ${g.name}` : ''
})

function tryClose() {
  if (!store.reacting) store.closeGame()
}
</script>
