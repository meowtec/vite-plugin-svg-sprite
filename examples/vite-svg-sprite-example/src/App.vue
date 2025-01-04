<template>
  <div>
    <h2>Static import:</h2>
    <Icon :name="alarmIcon" />
    <Icon :name="cubeIcon" />
    <h2>Dynamic import:</h2>
    <Dynamic />
  </div>
</template>

<script>
import Icon from './components/Icon.vue';
import Dynamic from './components/Dynamic.vue';
import alarmIcon from './assets/icons/alarm.svg';
import cubeIcon from './assets/icons/cube.svg';

export default {
  name: 'App',
  components: {
    Icon,
    Dynamic,
  },
  data() {
    return {
      alarmIcon,
      cubeIcon,
    };
  },
};
</script>
