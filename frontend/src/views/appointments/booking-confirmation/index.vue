<template>
  <section class="simple-page">
    <div class="card">
      <p class="eyebrow">AutoSphere</p>
      <h1>Confirmación de cita</h1>
      <p>
        Este paso conserva continuidad visual y resume que la cita quedó lista
        para envío o confirmación final.
      </p>
      <div class="actions">
        <button @click="router.push({ name: 'my-appointments' })">
          Ver mis citas
        </button>
        <button
          class="secondary"
          @click="router.push({ name: 'public-catalog' })"
        >
          Seguir explorando
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<style scoped>
.simple-page {
  padding: 120px 24px 40px;
  display: grid;
  place-items: center;
}
.card {
  max-width: 620px;
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 16px 40px rgba(15, 30, 44, 0.08);
  display: grid;
  gap: 16px;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 12px;
  color: #64748b;
}
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
button {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: #0f1e2c;
  color: #fff;
  cursor: pointer;
}
.secondary {
  background: #e2e8f0;
  color: #0f172a;
}
</style>
