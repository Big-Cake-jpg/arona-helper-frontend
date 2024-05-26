<script setup lang="ts">
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

setColorScheme('#5cabff');
</script>

<template>
  <Navbar />
  <div class="m-auto p-4">
    <router-view />
  </div>
</template>

<style scoped></style>
