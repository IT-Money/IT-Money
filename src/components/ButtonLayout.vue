<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: 'var(--gray200)',
  },
  textColor: {
    type: String,
    default: 'var(--gray600)',
  },
})
</script>

<template>
  <button
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
    }"
    class="custom-button"
  >
    {{ text }}
  </button>
</template>

<style scoped>
.custom-button {
  border: none;
  outline: none;
  border-radius: var(--space-m);
  padding: calc(var(--space-m) / 1.5) calc(var(--space-l) * 1.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.custom-button:hover {
  opacity: 0.8;
}
</style>
