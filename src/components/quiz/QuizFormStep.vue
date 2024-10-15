<template>
  <div class="calc__thx">
    <div class="popup_call__form">
      <div class="popup_call__form_list">
        <div class="popup_call__form_item">
          <div class="form_input">
            <label class="form_input__label">Ваше имя</label>
            <div class="form_input__field">
              <input class="form_input__element" type="text" placeholder="Имя" />
            </div>
          </div>
        </div>
        <div class="popup_call__form_item">
          <div class="form_input">
            <label class="form_input__label">Ваш телефон</label>
            <div class="form_input__field">
              <input
                class="form_input__element"
                type="tel"
                placeholder="+7 (999) 999-99-99"
              />
            </div>
          </div>
        </div>
        <div class="popup_call__form_item js-step-form-submit">
          <input class="popup_call__form_submit btn_base" value="Получить подарок" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
