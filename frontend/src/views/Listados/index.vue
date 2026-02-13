<template>
  <div class="listados">

    <!-- HEADER -->
    <header class="header">
      <h1 class="title">Autosphere</h1>
      <input
        v-model="search"
        type="text"
        class="search"
        placeholder="Search"
      />
    </header>

    <!-- CONTENT -->
    <section class="content">
      <h2 class="subtitle">Lista de autos</h2>

      <div class="cars-grid">
        <div
          class="car-card"
          v-for="car in filteredCars"
          :key="car.id"
        >
          <img :src="car.image" alt="auto" />
          <h3>{{ car.name }}</h3>
          <span class="status">{{ car.status }}</span>
          <p>{{ car.location }}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const cars = ref([
  {
    id: 1,
    name: '2016 Fiat 500',
    status: 'New',
    location: 'Oregon USA',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442'
  },
  {
    id: 2,
    name: '2021 Chevrolet Silverado 1500',
    status: 'New',
    location: 'Alberta Canada',
    image: 'https://images.unsplash.com/photo-1605559424843-9c3c3f4e9c2b'
  },
  {
    id: 3,
    name: 'Porsche 2019',
    status: 'New',
    location: 'Barcelona Spain',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
  },
  {
    id: 4,
    name: 'BMW Coupe',
    status: 'New',
    location: 'California USA',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
  },
  {
    id: 5,
    name: 'Classic Mustang',
    status: 'New',
    location: 'Texas USA',
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763'
  },
  {
    id: 6,
    name: 'Audi SUV',
    status: 'New',
    location: 'Berlin Germany',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753'
  }
])

const filteredCars = computed(() =>
  cars.value.filter(car =>
    car.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style scoped src="./styles.css"></style>

