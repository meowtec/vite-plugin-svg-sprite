<template>
  <div>
    <h2>Normal import:</h2>
    <Icon :name="alarmIcon" />
    <h2>Dynamic import:</h2>
    <Dynamic />
  </div>
</template>

<script>
import Icon from './components/Icon.vue';
import Dynamic from './components/Dynamic.vue';
import alarmIcon from './assets/icons/alarm.svg';

export default {
  name: 'App',
  components: {
    Icon,
    Dynamic,
  },
  data() {
    return {
      alarmIcon,
    };
  },
};
</script>
