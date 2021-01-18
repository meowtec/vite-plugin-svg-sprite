<template>
  <svg
    class="icon"
    aria-hidden="true"
  >
    <use
      :xlink:href="`#${name}`"
    />
  </svg>
</template>

<style>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
