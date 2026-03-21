<template>
  <div class="home-page">
    <!-- NAVBAR -->
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <div class="navbar-container">
        <div class="logo">AutoSphere</div>
        <ul class="nav-menu">
          <li><a href="#hero">Home</a></li>
          <li><a href="#cars">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a @click="goToLogin" class="login-link">Login</a></li>
        </ul>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero" id="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Cars for sale with good prices<br>and the best quality</h1>
        <p class="hero-subtitle">Make & Model</p>
        
        <!-- SEARCH BOX -->
        <div class="search-container">
          <div class="search-box">
            <div class="search-group">
              <label>Make</label>
              <select v-model="searchFilters.make">
                <option value="">Select Make</option>
                <option>BMW</option>
                <option>Honda</option>
                <option>Volkswagen</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Mazda</option>
                <option>Nissan</option>
              </select>
            </div>
            <div class="search-group">
              <label>Model</label>
              <select v-model="searchFilters.model">
                <option value="">Select Model</option>
                <option>Serie 3</option>
                <option>Civic Type R</option>
                <option>Golf GTI</option>
                <option>Camry</option>
                <option>CX-5</option>
              </select>
            </div>
            <div class="search-group">
              <label>ZIP Code</label>
              <input 
                type="text" 
                v-model="searchFilters.zipCode" 
                placeholder="ZIP Code"
              />
            </div>
            <button class="search-btn" @click="handleSearch">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21L16.65 16.65"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED LISTINGS -->
    <section id="cars" class="featured-section">
      <div class="section-container">
        <h2 class="section-title">Featured Listings</h2>
        
        <div class="cars-grid">
          <div 
            v-for="car in displayedCars" 
            :key="car.id"
            class="car-card"
            @click="viewCarDetail(car.id)"
          >
            <div class="car-image">
              <img :src="car.img" :alt="car.model" loading="lazy" />
              <div class="car-badge">{{ car.condition }}</div>
            </div>
            <div class="car-content">
              <div class="car-header">
                <span class="car-model">{{ car.model }}</span>
                <span class="car-price">{{ car.price }}</span>
              </div>
              <div class="car-year">{{ car.year }}</div>
              <div class="car-actions">
                <button class="btn-view" @click.stop="viewDetail(car.id)">
                  Ver Detalles
                </button>
                <button class="btn-contact" @click.stop="contactSeller(car.id)">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-next" @click="nextPage" v-if="cars.length > perPage">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18L15 12L9 6"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- TRUST SECTION -->
    <section id="about" class="trust-section">
      <div class="section-container">
        <h2 class="trust-title">
          Descubre por qué más de <span class="highlight">300,000 clientes</span> 
          ya confiaron en AutoSphere
        </h2>
        
        <div class="reviews-grid">
          <div 
            v-for="review in reviews" 
            :key="review.id"
            class="review-card"
          >
            <div class="reviewer-header">
              <img class="reviewer-avatar" :src="review.avatar" :alt="review.name" />
              <div class="reviewer-info">
                <div class="reviewer-name">{{ review.name }}</div>
                <div class="reviewer-role">{{ review.role }}</div>
              </div>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <div class="review-stars">
              <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isScrolled = ref(false)

const searchFilters = ref({
  make: '',
  model: '',
  zipCode: ''
})

const cars = ref([
  {
    id: 1,
    year: '2018',
    model: 'BMW Serie 3 (E46)',
    price: '$100,500',
    condition: 'CERTIFIED',
    img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    year: '2021',
    model: 'Honda Civic Type R',
    price: '$90,000',
    condition: 'CERTIFIED',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    year: '2024',
    model: 'Volkswagen Golf GTI',
    price: '$80,000',
    condition: 'USED',
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    year: '2020',
    model: 'Toyota Camry SE',
    price: '$75,000',
    condition: 'USED',
    img: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    year: '2013',
    model: 'Audi A4 Quattro',
    price: '$130,000',
    condition: 'USED',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
  }
])

const reviews = ref([
  {
    id: 1,
    name: 'Mariana L.',
    role: 'Vendedora',
    avatar: 'https://i.pravatar.cc/100?img=47',
    text: 'He confiado en la plataforma perfecta para conectarme con compradores. El proceso de comunicación con los vendedores fue directo y transparente. Fue fácil y me llevó desde el inicio hasta el cierre de la compra.'
  },
  {
    id: 2,
    name: 'Juan M.',
    role: 'Comprador',
    avatar: 'https://i.pravatar.cc/100?img=12',
    text: 'Publicar mi auto fue súper sencillo. En menos de una hora ya tenía respuestas. La plataforma me guió para agregar todos los detalles. Recibí mensajes de compradores interesados en pocos días y logré vender rápido.'
  },
  {
    id: 3,
    name: 'Carlos M.',
    role: 'Comprador',
    avatar: 'https://i.pravatar.cc/100?img=25',
    text: 'La verdad me sorprendió lo fácil que fue encontrar el auto que quería. La página tiene buenos filtros para detallar mi búsqueda. Pude contactar al vendedor directamente. El proceso fue rápido y sin complicaciones.'
  }
])

const currentPage = ref(0)
const perPage = 3

const displayedCars = computed(() => {
  const start = currentPage.value * perPage
  return cars.value.slice(start, start + perPage)
})

const nextPage = () => {
  const totalPages = Math.ceil(cars.value.length / perPage)
  currentPage.value = (currentPage.value + 1) % totalPages
}

const goToLogin = () => {
  router.push('/login')
}

const handleSearch = () => {
  console.log('Búsqueda:', searchFilters.value)
  router.push({
    name: 'Catalog',
    query: searchFilters.value
  })
}

const viewCarDetail = (carId) => {
  router.push({
    name: 'VehicleDetail',
    params: { id: carId }
  })
}

const viewDetail = (carId) => {
  router.push({
    name: 'VehicleDetail',
    params: { id: carId }
  })
}

const contactSeller = (carId) => {
  console.log('Contactar vendedor:', carId)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped src="./styles.css"></style>