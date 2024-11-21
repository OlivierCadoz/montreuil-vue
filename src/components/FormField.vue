<script setup lang="ts">
const { row } = defineProps({
  row: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <fieldset class="form__field" :class="{ 'form__field--row': row }">
    <legend class="form__legend">
      <slot name="legend"/>
    </legend>

    <slot />
  </fieldset>
</template>

<style lang="scss" scoped>
.form__field {
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 8px 16px 12px;
  border: 0;

  & + &{
    margin-top: 16px;
  }

  &--row {
    flex-direction: row;
  }
}

.form__legend {
  padding: 0 8px;
  color: #191919;
  font-size: 18px;
}
</style>