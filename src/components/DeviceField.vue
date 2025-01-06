<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number], // Allows both strings and numbers
      default: '',
    },
    showComponent: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<template>
  <div v-if="showComponent" class="field__container">
    <label class="field__label">{{ label }}</label>
    <span class="field__value">{{ value }}</span>
  </div>
</template>

<style scoped>
.field__container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 25vh;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-bottom: 1px solid var(--border-color, #ddd);
}

.field__label {
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-family: 'cabinetgrotesk', sans-serif;
  color: var(--field-label-color, #333);
  margin-bottom: 0.25rem;
}

.field__value {
  width: 100%;
  text-align: right;
  word-wrap: break-word;
  font-family: 'cabinetgrotesk', sans-serif;
  color: var(--field-value-color, #555);
}

@media (max-width: 768px) {
  .field__container {
    flex-direction: column;
    align-items: flex-start;
  }

  .field__value {
    text-align: left;
    margin-top: 0.5rem;
  }
}

@media (min-width: 391px) and (max-width: 1024px) {
  .field__container {
    width: 100%;
  }
}
</style>
