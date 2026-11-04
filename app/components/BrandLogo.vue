<script setup lang="ts">
withDefaults(defineProps<{ light?: boolean; compact?: boolean }>(), { light: false, compact: false })
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light, 'logo--compact': compact }">
    <BrandMark class="logo__mark" />
    <span class="logo__text">
      <span class="logo__word"><b>Ideal</b>Dent</span>
      <span class="logo__sub">Odontologia</span>
    </span>
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  line-height: 1;
}
.logo__mark {
  width: 42px;
  height: 42px;
  flex: none;
  transition: transform 0.5s var(--ease-spring);
}
.logo:hover .logo__mark {
  transform: rotate(-8deg) scale(1.06);
}
.logo__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.logo__word {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.38rem;
  letter-spacing: -0.03em;
  color: var(--blue-600);
}
.logo__word b {
  color: var(--navy-900);
  font-weight: 800;
}
.logo__sub {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.56rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.logo--light .logo__word,
.logo--light .logo__word b {
  color: var(--white);
}
.logo--light .logo__sub {
  color: var(--sky-200);
}
.logo--compact .logo__mark {
  width: 36px;
  height: 36px;
}
.logo--compact .logo__word {
  font-size: 1.2rem;
}
</style>
