<script setup lang="ts">
const uid = useId()
</script>

<template>
  <!-- Selo da marca: dente branco com a onda azul, como no logo do Instagram -->
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient :id="`bg-${uid}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2a7be8" />
        <stop offset="1" stop-color="#0b2f7a" />
      </linearGradient>
      <linearGradient :id="`wave-${uid}`" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#4fa3f0" />
        <stop offset="1" stop-color="#1560d6" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="18" :fill="`url(#bg-${uid})`" />
    <path
      d="M22.4 11.5c-6.2 0-10.4 4.4-10.4 11.1 0 4.4 1.5 7.7 3.1 11.5 1.8 4.5 2 9.3 2.9 13.3.7 3.4 2.2 5.3 4 5.3 2.4 0 3.3-3.1 4-6.8.7-3.4 1.7-6.6 6-6.6s5.3 3.2 6 6.6c.7 3.7 1.6 6.8 4 6.8 1.8 0 3.3-1.9 4-5.3.9-4 1.1-8.8 2.9-13.3 1.6-3.8 3.1-7.1 3.1-11.5 0-6.7-4.2-11.1-10.4-11.1-4 0-6.2 1.8-9.6 1.8s-5.6-1.8-9.6-1.8Z"
      fill="#fff"
    />
    <path
      d="M15.5 27.5c4.2-3.6 8.6-3.6 12.6-1.3 4.4 2.5 8.6 2.6 13 .2 2.6-1.4 4.8-1.6 7.4-.6"
      fill="none"
      :stroke="`url(#wave-${uid})`"
      stroke-width="3.4"
      stroke-linecap="round"
    />
    <path
      d="M17 33.2c3.6-2.4 7.4-2.3 11 -.4 3.8 2 7.6 2 11.4.1 2.4-1.2 4.6-1.4 7-.6"
      fill="none"
      stroke="#0a1e4d"
      stroke-width="1.6"
      stroke-linecap="round"
      opacity=".85"
    />
  </svg>
</template>
