<script setup lang="ts">
import { RESIDENTS } from '../ts/services/utils/constants';

const { expenses } = defineProps({
  expenses: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="result-modal">
    <ul class="result-modal__list">
      <li
        class="result-modal__item"
        v-for="(resident, index) in RESIDENTS" :key="resident">
        <span class="result-modal__item--bold">{{ resident }}</span>
        <span class="result-modal__item--mono">{{ expenses[index] }}</span>
      </li>
    </ul>

    <button class="result-modal__close-btn" @click="$emit('close')">close</button>
  </section>
</template>

<style lang="scss" scoped>
.result-modal {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 10px auto;
  background-color: #90ee90;
  padding: 8px;
  border-radius: 16px;

  &__close-btn {
    align-self: flex-end;
    margin-top: 4px;
    padding: 6px 12px;
    color: #90ee90;
    font-size: 16px;
    line-height: 20px;
    background-color: #008000;
    border-radius: 50px;
    border: 2px solid #008000;
    transition: ease-in-out 0.2s background-color;

    &:hover {
      color: #008000;
      background-color: transparent;
      cursor: pointer;
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    color: #008000;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    line-height: 20px;

    &:nth-child(2n) {
      border-radius: 50px;
      background-color: #008000;
      color: #90ee90;
    }

    &--bold {
      font-weight: 700;
    }

    &--mono {
      font-family: monospace;
    }
  }
}
</style>
