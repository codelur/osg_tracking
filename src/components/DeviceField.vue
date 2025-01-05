<script>
export default {
  props: ['label', 'value', 'showComponent'],
}
</script>

<template>
  <div v-if="showComponent" class="field__container">
    <label class="field__label">{{ label }} </label>
    <span class="field__value">{{ value }}</span>
  </div>
</template>

<style>
.field__label {
  display: block;
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-family: 'cabinetgrotesk';
}

.field__container {
  display: flex;
  width: 25vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 5px;
  border-bottom: 1px solid #ddd;
}

.field__label {
  font-weight: bold;
  color: var(--field-label-color);
  flex-basis: 40%;
}

.field__value {
  color: var(--field-value-color);
  flex-basis: 60%;
  width: 100%;
  text-align: right;
  text-align: right;
  word-wrap: break-word;
  font-family: 'cabinetgrotesk';
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

@media screen and (min-width: 391px) and (max-width: 1024px) {
  .field__container {
    display: flex;
    width: 100%;
  }
}
</style>
