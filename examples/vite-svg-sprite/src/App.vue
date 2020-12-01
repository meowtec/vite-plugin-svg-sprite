<template>
  <div>
    <HelloWorld />
    <Dynamic />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const sleep = (second) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}

export default {
  name: 'App',
  components: {
    HelloWorld,
    Dynamic: defineAsyncComponent(async () => {
      await sleep(2);
      return import('./components/Test.vue')
    }),
  },
};
</script>
