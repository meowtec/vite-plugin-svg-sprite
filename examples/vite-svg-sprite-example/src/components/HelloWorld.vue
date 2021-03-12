<template>
  <div>
    <img :src="logo" width="30" />
    <br />
    ALARM
    <Icon :name="alarmIconId" />
    <hr />
    Icons imported by import()<br />
    <Icon name="car" />
    <Icon name="drag" />
    <Icon name="edit" />
    <Icon name="education" />
    <Icon name="email" />
    <Icon name="example" />
    <hr />
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
