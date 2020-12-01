<template>
  <div>
    GRADE
    <Icon :name="gradeIconId" />
  </div>
</template>

<script>
import Icon from './Icon.vue';
import gradeIconId from '../assets/icons/grade.svg';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      count: 0,
      gradeIconId,
    };
  },
};
</script>
