<template>
  <div class="animated-background">
    <div class="search-panel">
      <h2>TEXT</h2>
      <p class="subtitle">TEXT</p>
      <div class="button-grid">
        <select v-model="make" class="btn">
          <option value="">Any Make</option>
          <option v-for="m in Object.keys(cars)" :key="m" :value="m">
            {{ m }}
          </option>
        </select>
        <select v-model="model" class="btn" :disabled="!make">
          <option value="">Any Model</option>
          <option v-for="md in cars[make] || []" :key="md" :value="md">
            {{ md }}
          </option>
        </select>
        <input v-model="postal" type="text" class="btn" placeholder="Postal" />
        <button class="btn" @click="search">Search</button>
      </div>
    </div>
    <div class="gallery-section">
      <h2>TEXT</h2>
      <div class="image-grid">
        <div v-for="n in 5" :key="n" class="image-card">
          <div class="image-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      make: '',
      model: '',
      postal: '',
      cars: {
        Toyota: ['Corolla', 'Camry', 'RAV4'],
        Honda: ['Civic', 'Accord', 'CR-V'],
        Ford: ['Mustang', 'F-150', 'Explorer'],
        BMW: ['X3', 'X5', 'Series 3'],
        Audi: ['A3', 'A4', 'Q5'],
      },
    };
  },
  methods: {
    search() {
      alert(
        `TEST SEARCH\n\nMake: ${this.make || 'Any'}\nModel: ${this.model || 'Any'}\nPostal: ${this.postal || 'None'}`
      );
    },
  },
};
</script>

<style scoped src="./styles.css"></style>
