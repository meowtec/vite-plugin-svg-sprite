<template>
  <div>
    <img :src="logo" width="30" />
    <br />
    ALARM
    <Icon :name="alarmIconId" />
  </div>
</template>

<script>
import Icon from './Icon.vue';
import alarmIconId from '../assets/icons/alarm.svg';
// use the raw file loa
import logo from '../assets/logo.svg';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      count: 0,
      alarmIconId,
      logo,
    };
  },
};
</script>
