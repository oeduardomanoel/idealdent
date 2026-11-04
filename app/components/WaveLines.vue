<template>
  <!-- Linhas finas em onda, o mesmo grafismo de fundo dos posts da clínica -->
  <svg class="waves" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.2">
      <path v-for="i in 9" :key="i" :d="d(i)" :opacity="1 - i * 0.07" />
    </g>
  </svg>
</template>

<script setup lang="ts">
const d = (i: number) => {
  const y = 120 + i * 26
  const a = 60 + i * 6
  return `M0 ${y} C 240 ${y - a}, 480 ${y + a}, 720 ${y} S 1200 ${y - a}, 1440 ${y}`
}
</script>

<style scoped>
.waves {
  width: 100%;
  color: #fff;
}
</style>
