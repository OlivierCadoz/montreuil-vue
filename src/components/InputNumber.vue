<script setup lang="ts">
  const { modelValue, inputId } = defineProps({
    modelValue: {
      type: Number,
      required: true
    },
    inputId: {
      type: String,
      required: true
    }
  });

  defineEmits(['update:modelValue'])
</script>

<template>
  <label class="form__label" :for="inputId">
    <slot />
  </label>

  <input
    :id="inputId"
    class="form__input"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as any).value)"
  />
</template>

<style lang="scss" scoped>
.form__label {
  font-family: 'Roboto-Regular', sans-serif;
  width: fit-content;
  padding: 0 8px;
  transform: translate(24px, 8px);
  background-color: #fff;
  color: #191919;
  border-radius: 0 0 12px 12px;
}

.form__input {
  flex: 1;
  margin-bottom: 8px;
  padding: 8px 24px;
  border-radius: 50px;
  border: 1px solid #d3d3d3;
  box-shadow: inset 0 2px 6px #0000001a;
  line-height: 22px;

  @media (min-width: 768px) {
    padding: 16px 24px;
  }
}
</style>