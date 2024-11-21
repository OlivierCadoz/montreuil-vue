<script setup lang="ts">
import { ref } from 'vue'

import FormField from '../components/FormField.vue'
import InputNumber from '../components/InputNumber.vue'
import ResultList from '../components/ResultList.vue'

import { getDebit, getVeolia } from '../ts/services/debit.service'

const debit = ref(0)
const cons = ref(0)
const axelCons = ref(0)
const olivierCons = ref(0)
const expenses = ref([] as number[])
const isVeolia = ref(false)

function getExpenses() {
  if (isVeolia.value) {
    expenses.value = getVeolia({
      totalExpense: +debit.value,
      totalConsumption: +cons.value,
      consumptionAxel: +axelCons.value,
      consumptionOlivier: +olivierCons.value,
    })
  } else {
    expenses.value = getDebit(+debit.value)
  }
}
</script>

<template>
  <section class="grid-container">
    <form class="debit-form" @submit.prevent="getExpenses">
      <FormField row>
        <template #legend>
          Est-ce une facture
          <span class="debit-form__legend--veolia"> Véolia</span> ?
        </template>

        <label class="debit-form__toggle-label" for="toggle">Oui</label>
        <input id="toggle" class="debit-form__toggle" type="checkbox" v-model="isVeolia" />
      </FormField>

      <FormField>
        <template #legend> Répartition de la facture </template>

        <InputNumber inputId="debit" v-model="debit"> Montant total : </InputNumber>

        <template v-if="isVeolia">
          <InputNumber inputId="cons" v-model="cons"> Consommation totale : </InputNumber>

          <InputNumber inputId="axel-cons" v-model="axelCons"> Consommation de Axel : </InputNumber>

          <InputNumber inputId="olivier-cons" v-model="olivierCons">
            Consommation de olivier :
          </InputNumber>
        </template>
      </FormField>

      <button class="debit-form__submit" type="submit">Répartir</button>
    </form>

    <aside class="result-wrapper">
      <ResultList v-if="!!expenses.length" :expenses="expenses" @close="expenses = []" />
    </aside>
  </section>
</template>

<style lang="scss" scoped>
.grid-container {
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 320px 1fr;
  }
}

.debit-form {
  display: flex;
  flex-direction: column;
}

.result-wrapper {
  @media (min-width: 768px) {
    grid-column-start: 3;
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding: 100px 16px 0;
  }
}

.debit-form {
  flex: 1;
  padding: 16px;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
    max-width: 320px;
    margin: 100px 0 auto;
    padding: 0 16px;
  }

  &__legend--veolia {
    color: #ec1b23;
    font-weight: 700;
  }

  &__submit {
    flex: 0 1;
    margin: 16px 19px 0;
    padding: 8px 24px;
    border: none;
    border-radius: 50px;
    background-color: #0652ff;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    transition: ease-in-out 0.2s background-color;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: rgba(#0652ff, 0.85);
    }

    @media (min-width: 768px) {
      padding: 16px 24px;
    }
  }
}
</style>
