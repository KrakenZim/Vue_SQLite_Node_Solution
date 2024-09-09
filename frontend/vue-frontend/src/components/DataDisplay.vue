<template>
    <div class="container">
      <h1>Data Display</h1>
      <input v-model="searchQuery" placeholder="Search..." />
      <button @click="fetchData">Fetch Data</button>
      <div v-if="loading" class="loading-spinner"></div>
      <div v-if="error" class="error">{{ error }}</div>
      <ul v-if="filteredData.length">
        <li v-for="item in filteredData" :key="item.id">
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: [],
        searchQuery: '',
        loading: false,
        error: null
      };
    },
    computed: {
      filteredData() {
        if (!this.searchQuery) return this.data;
        return this.data.filter(item =>
          item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      async fetchData() {
        this.loading = true;
        try {
          const response = await axios.get('http://localhost:3000/data');
          this.data = response.data;
        } catch (e) {
          this.error = 'Error fetching data';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
  min-height: 100vh; /* Make container fill at least the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  padding: 20px;
  text-align: center;
  background-image: url('@/assets/cool_bg_2.jfif'); 
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent repeating the background image */
}

  input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #42b983;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2c8c60;
  }
  
  .loading-spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 20px auto;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error {
    color: red;
  }
  
  h1 {
    font-size: 2em;
  }
  
  li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  li:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }
  </style>
  