<script setup lang="ts">
import { team } from '#shared/clinic'
</script>

<template>
  <section id="equipe" class="section team" aria-labelledby="team-title">
    <div class="container">
      <div class="section-head section-head--center">
        <p v-reveal class="eyebrow">Equipe</p>
        <h2 id="team-title" v-reveal="80" class="h2">Quem vai cuidar do seu sorriso</h2>
      </div>

      <div class="team__grid">
        <article v-for="(m, i) in team" :key="m.name" v-reveal="i * 140" class="member">
          <div class="member__photo">
            <img v-if="m.photo" :src="m.photo" :alt="`${m.name}, ${m.role.toLowerCase()} da Ideal Dent`" loading="lazy" width="640" height="720" />
            <div v-else class="member__avatar" aria-hidden="true">
              <WaveLines class="member__waves" />
              <span>{{ m.initials }}</span>
            </div>
            <ul class="member__areas">
              <li v-for="a in m.areas" :key="a">{{ a }}</li>
            </ul>
          </div>
          <div class="member__body">
            <h3>{{ m.name }}</h3>
            <p class="member__role">
              {{ m.role }}<template v-if="m.cro"> · {{ m.cro }}</template>
            </p>
            <p class="member__bio">{{ m.bio }}</p>
            <blockquote v-if="m.quote" class="member__quote">
              <p>“{{ m.quote.text }}”</p>
              <cite>{{ m.quote.source }}</cite>
            </blockquote>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
.member {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  border-radius: var(--radius-xl);
  background: var(--white);
  box-shadow: var(--shadow), inset 0 0 0 1px var(--line);
  overflow: hidden;
  transition:
    transform 0.5s var(--ease-spring),
    box-shadow 0.5s var(--ease-out);
}
.member:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}
.member__photo {
  position: relative;
  min-height: 320px;
  overflow: hidden;
}
.member__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease-out);
}
.member:hover .member__photo img {
  transform: scale(1.05);
}
.member__avatar {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background:
    radial-gradient(80% 60% at 70% 10%, rgb(143 205 247 / 0.7), transparent 70%),
    linear-gradient(160deg, var(--blue-500), var(--navy-800));
}
.member__waves {
  position: absolute;
  inset: auto -20% 10%;
  width: 140%;
  height: 50%;
  opacity: 0.25;
  transition: transform 1.2s var(--ease-out);
}
.member:hover .member__waves {
  transform: translateX(-8%);
}
.member__avatar span {
  position: relative;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 4.5rem;
  letter-spacing: -0.04em;
  color: var(--white);
  text-shadow: 0 20px 40px rgb(6 18 56 / 0.4);
  transition: transform 0.6s var(--ease-spring);
}
.member:hover .member__avatar span {
  transform: scale(1.08) rotate(-4deg);
}
.member__areas {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.member__areas li {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.95);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.72rem;
  color: var(--blue-700);
}
.member__body {
  padding: 32px 30px;
}
.member__body h3 {
  font-size: 1.5rem;
  font-weight: 800;
}
.member__role {
  margin-top: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--blue-600);
}
.member__bio {
  margin-top: 16px;
  color: var(--ink-soft);
}
.member__quote {
  margin: 18px 0 0;
  padding: 16px 18px;
  border-left: 3px solid var(--blue-600);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--sky-50);
}
.member__quote p {
  font-style: italic;
  color: var(--navy-900);
}
.member__quote cite {
  display: block;
  margin-top: 6px;
  font-style: normal;
  font-size: 0.8rem;
  color: var(--ink-mute);
}
@media (max-width: 1080px) {
  .team__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 620px) {
  .member {
    grid-template-columns: 1fr;
  }
  .member__photo {
    min-height: 240px;
  }
}
</style>
