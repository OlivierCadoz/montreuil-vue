<script setup lang="ts">
import { ref } from "vue";
import { getDebit, getVeolia } from "@/services/debit.service";
import { RESIDENTS } from "@/services/utils/constants";

const debit = ref("");
const cons = ref("");
const axelCons = ref("");
const olivierCons = ref("");
const expenses = ref([]);
const isVeolia = ref(false);

function getExpenses() {
  expenses.value = isVeolia.value
    ? getVeolia({
        totalExpense: debit.value,
        totalConsumption: cons.value,
        consumptionAxel: axelCons.value,
        consumptionOlivier: olivierCons.value,
      })
    : getDebit(debit.value);
}
</script>

<template>
  <form class="debit-form" @submit.prevent="getExpenses">
    <fieldset class="debit-form__field debit-form__field--row">
      <legend class="debit-form__legend">
        Est-ce une facture
        <span class="debit-form__legend--veolia"> Véolia</span> ?
      </legend>

      <label class="debit-form__toggle-label" for="toggle">Oui</label>
      <input
        id="toggle"
        class="debit-form__toggle"
        type="checkbox"
        v-model="isVeolia"
      />
    </fieldset>

    <fieldset class="debit-form__field">
      <legend class="debit-form__legend">Répartition de la facture</legend>

      <label class="debit-form__label" for="debit">Montant total :</label>
      <input
        id="debit"
        class="debit-form__input"
        type="number"
        v-model="debit"
      />

      <template v-if="isVeolia">
        <label class="debit-form__label" for="cons">
          Consommation totale :
        </label>
        <input
          id="cons"
          class="debit-form__input"
          type="number"
          v-model="cons"
        />

        <label class="debit-form__label" for="axel-cons">
          Consommation de Axel :
        </label>
        <input
          id="axel-cons"
          class="debit-form__input"
          type="number"
          v-model="axelCons"
        />

        <label class="debit-form__label" for="olivier-cons">
          Consommation de Olivier :
        </label>
        <input
          id="olivier-cons"
          class="debit-form__input"
          type="number"
          v-model="olivierCons"
        />
      </template>

      <button class="debit-form__submit" type="submit">Répartir</button>
    </fieldset>

    <ul v-if="!!expenses.length" class="debit-form__result-list">
      <li v-for="(resident, index) in RESIDENTS" :key="resident">
        {{ resident }} : {{ expenses[index] }}
      </li>
    </ul>
  </form>
</template>

<style lang="scss" scoped>
.debit-form,
.debit-form__field {
  display: flex;
  flex-direction: column;

  &--row {
    flex-direction: row;
  }
}

.debit-form {
  flex: 1;
  padding: 24px 16px;

  @media (min-width: 768px) {
    max-width: 320px;
    margin: 100px 0 auto;
    border-radius: 16px;
    border: 1px solid #d3d3d3;
    box-shadow: 5px 5px 15px 5px #d3d3d3;
  }

  &__label {
    width: fit-content;
    padding: 0 8px;
    transform: translate(24px, 8px);
    background-color: #fff;
    /* background: linear-gradient(to bottom, #fff 0%, #fff 70%, transparent 70%, transparent 100%); */
    color: #191919;
    border-radius: 0 0 12px 12px;
  }

  &__input {
    flex: 1;
    margin-bottom: 8px;
    padding: 16px 24px;
    border-radius: 50px;
    border: 1px solid #d3d3d3;
    line-height: 22px;
  }

  &__legend {
    padding: 0 8px;
    color: #191919;
    font-size: 18px;

    &--veolia {
      color: #ec1b23;
      font-weight: 700;
    }
  }

  &__field {
    justify-content: end;
    padding: 8px 16px 14px;
    border-radius: 16px;
    border: 1px solid #d3d3d3;
  }

  &__field + &__field {
    margin-top: 24px;
  }

  &__submit {
    flex: 0 1;
    margin-top: 8px;
    padding: 16px 24px;
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
  }

  &__result-list {
    background-color: white;
    position: fixed;
    top: 0;
    left: 50%;
    width: 320px;
    transform: translateX(-160px);
  }
}
</style>
