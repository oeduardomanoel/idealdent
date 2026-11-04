<script setup lang="ts">
const props = defineProps<{ name: string; size?: number | string }>()

// Ícones em traço, 24x24. Os de tratamento foram desenhados pra este site.
const paths: Record<string, string> = {
  tooth:
    '<path d="M7.6 3.2c-2.7 0-4.6 2-4.6 5 0 2 .7 3.5 1.4 5.2.8 2 .9 4.2 1.3 6 .3 1.6 1 2.4 1.8 2.4 1.1 0 1.5-1.4 1.8-3.1.3-1.5.8-3 2.7-3s2.4 1.5 2.7 3c.3 1.7.7 3.1 1.8 3.1.8 0 1.5-.8 1.8-2.4.4-1.8.5-4 1.3-6 .7-1.7 1.4-3.2 1.4-5.2 0-3-1.9-5-4.6-5-1.8 0-2.8.8-4.4.8s-2.6-.8-4.4-.8Z"/>',
  aligner:
    '<path d="M3 9.5c0-2 1.6-3.5 3.6-3.5h10.8C19.4 6 21 7.5 21 9.5v1.3c0 3.7-4 7.2-9 7.2s-9-3.5-9-7.2V9.5Z"/><path d="M6.5 9.5v1.2M10 9.5v1.6M14 9.5v1.6M17.5 9.5v1.2"/><path d="M8 3.5c2.6-1 5.4-1 8 0" opacity=".55"/>',
  braces:
    '<rect x="3" y="7" width="4.4" height="10" rx="1.6"/><rect x="9.8" y="7" width="4.4" height="10" rx="1.6"/><rect x="16.6" y="7" width="4.4" height="10" rx="1.6"/><path d="M2 12h20"/><rect x="4" y="10.6" width="2.4" height="2.8" rx=".5"/><rect x="10.8" y="10.6" width="2.4" height="2.8" rx=".5"/><rect x="17.6" y="10.6" width="2.4" height="2.8" rx=".5"/>',
  sparkle:
    '<path d="M12 3l1.8 4.9L19 9.6l-5.2 1.8L12 16.3l-1.8-4.9L5 9.6l5.2-1.7L12 3Z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"/><path d="M5 16.5l.6 1.4 1.4.6-1.4.6L5 20.5l-.6-1.4L3 18.5l1.4-.6.6-1.4Z"/>',
  root:
    '<path d="M7.8 2.8c-2.3 0-3.8 1.6-3.8 4 0 1.6.6 2.8 1.1 4.2.7 1.7.8 3.6 1.1 5.1.3 1.3.8 2 1.5 2 .9 0 1.2-1.1 1.5-2.6.3-1.3.7-2.5 2.8-2.5s2.5 1.2 2.8 2.5c.3 1.5.6 2.6 1.5 2.6.7 0 1.2-.7 1.5-2 .3-1.5.4-3.4 1.1-5.1.5-1.4 1.1-2.6 1.1-4.2 0-2.4-1.5-4-3.8-4-1.5 0-2.3.6-3.7.6s-2.2-.6-3.7-.6Z"/><path d="M9.6 8.5v4.5M14.4 8.5v4.5" stroke-dasharray="1.6 1.4"/>',
  implant:
    '<path d="M7 3.5h10c.6 0 1 .4 1 1v1.6c0 1.9-2.7 3.4-6 3.4s-6-1.5-6-3.4V4.5c0-.6.4-1 1-1Z"/><path d="M9.5 10v1.2M14.5 10v1.2"/><path d="M8.6 12.5h6.8M9 15h6M9.4 17.5h5.2M10 20h4"/><path d="M12 11.2v10.3"/>',
  gum:
    '<path d="M3 8.5c3 2.2 6 3 9 3s6-.8 9-3"/><path d="M5.5 10.2v3.6c0 2.2 1.1 3.7 2.6 3.7s2.4-1.5 2.4-3.4v-2.5M13.5 11.6v2.5c0 1.9.9 3.4 2.4 3.4s2.6-1.5 2.6-3.7v-3.6"/><path d="M12 3.2c1.2 1.4 1.8 2.4 1.8 3.2a1.8 1.8 0 0 1-3.6 0c0-.8.6-1.8 1.8-3.2Z"/>',
  brush:
    '<path d="M4 20 15.5 8.5"/><path d="M13.5 6.5l4-4 4 4-4 4"/><path d="M15 5l.9.9M16.6 3.4l.9.9M18.6 8.6l.9.9M20.2 7l.9.9"/><path d="M5.5 15.5 8.5 18.5"/>',
  whatsapp:
    '<path d="M3.5 20.5 4.8 16A8.3 8.3 0 1 1 8 19.3l-4.5 1.2Z"/><path d="M9.1 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.3.6.8 1.2 1.4 1.7.6.5 1.2.8 1.6 1 .2.1.4 0 .5-.1l.6-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .5-.2 1.2-.8 1.6-.6.4-1.4.6-2.4.3a9 9 0 0 1-4.9-4.3c-.6-1.1-.6-2-.3-2.7l.2-.4Z" fill="currentColor" stroke="none"/>',
  phone:
    '<path d="M5 3.5h3.2l1.6 4.2-2.1 1.3a11 11 0 0 0 5.3 5.3l1.3-2.1 4.2 1.6V17a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 3 5.7 2 2 0 0 1 5 3.5Z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  star: '<path d="m12 3.2 2.6 5.5 6 .8-4.4 4.1 1.1 5.9L12 16.6l-5.3 2.9 1.1-5.9-4.4-4.1 6-.8L12 3.2Z" fill="currentColor"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.9"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/>',
  arrow: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  check: '<path d="m4.5 12.5 4.8 4.8L19.5 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  heart:
    '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.2 2.2 4.2-4.4"/>',
  wallet:
    '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><rect x="4" y="8" width="16.5" height="11" rx="2.5"/><path d="M16 13.5h1.5"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8 14h2M14 14h2" />',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  car: '<path d="M5 16.5V12l2-5h10l2 5v4.5"/><path d="M3.5 12h17v4.5h-17z"/><circle cx="7.5" cy="17.5" r="1.6"/><circle cx="16.5" cy="17.5" r="1.6"/>',
  chat: '<path d="M4 5.5h16v10H9.5L5 19.5v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>'
}

const svg = computed(() => paths[props.name] ?? paths.tooth)
</script>

<template>
  <svg
    :width="size ?? 24"
    :height="size ?? 24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    :class="name === 'arrow' ? 'icon-arrow' : undefined"
    v-html="svg"
  />
</template>
