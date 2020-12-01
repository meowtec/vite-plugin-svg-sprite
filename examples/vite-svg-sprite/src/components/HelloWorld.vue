<template>
  <div>
    ALARM
    <Icon :name="alarmIconId" />
  </div>
</template>

<script>
import Icon from './Icon.vue';
import alarmIconId from '../assets/icons/alarm.svg';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      count: 0,
      alarmIconId,
    };
  },
};
</script>
