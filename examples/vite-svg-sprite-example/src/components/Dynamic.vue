<template>
  <div>
    <select v-model="iconId">
      <option value="">Select an icon</option>
      <option value="alarm">alarm</option>
      <option value="car">car</option>
      <option value="email">email</option>
      <option value="grade">grade</option>
    </select>
    <div>
      <Icon v-if="iconName" :name="iconName" />
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      iconId: '',
      iconName: '',
    };
  },

  watch: {
    iconId: {
      handler(val) {
        import(`../assets/icons/${val}.svg`).then((icon) => {
          this.iconName = icon.default;
        });
      },
    },
  },
};
</script>
