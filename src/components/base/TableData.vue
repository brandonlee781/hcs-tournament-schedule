<template>
  <td class="px-6 py-4 whitespace-nowrap">
    <div class="background" :style="{ borderColor: color }"></div>
    <div
      class="text-sm font-medium dark:text-gray-200 light:text-gray-800 mobile-row data-slot"
      :style="{
        textDecoration: isMobile ? 'underline' : 'none',
        textDecorationThickness: '3px',
        textDecorationColor: color,
      }"
    >
      <slot></slot>
    </div>
  </td>
</template>

<script setup lang="ts">
import useTeam from '@/composables/useTeam'
import useWindowWidth from '@/composables/useWindowWidth'
import { Team } from '@/data'

const props = defineProps<{ highlights?: Team[] }>()

const { windowWidth } = useWindowWidth()
const isMobile = $computed(() => windowWidth.value <= 1024)
const { hoveredTeam } = useTeam()

const color = $computed(() => {
  const team = props.highlights?.find(h => h.name === hoveredTeam.value?.name)

  if (team) {
    return team.color
  }
  return 'transparent'
})
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: transparent;
  box-sizing: border-box;
  border-width: 8px;
  border-style: solid;
  pointer-events: none;
}
td {
  position: relative;
}
@media (max-width: 1200px) {
  .mobile-row {
    display: flex;
    flex-flow: column wrap;
  }
}
</style>
