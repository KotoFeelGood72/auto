<template>
  <div class="popup popup--contact">
    <div class="popup__in">
      <button
        class="popup_close js-popup-close"
        type="button"
        aria-label="Close Popup"
        tabindex="0"
        @click="closeAllModals()"
      ></button>
      <div class="popup__content">
        <div class="popup_call">
          <h2 class="popup_call__title">
            <strong>Получите консультацию</strong> по вашему проекту
          </h2>
          <div class="popup_call__subtitle">
            Оставьте свои данные и менеджер свяжется с вами
          </div>
          <div class="popup_call__form">
            <form action="GET">
              <div class="popup_call__form_list">
                <div class="popup_call__form_item">
                  <div class="form_input">
                    <label class="form_input__label" for="input_10"
                      >Введите имя</label
                    >
                    <div class="form_input__field">
                      <input
                        class="form_input__element"
                        type="text"
                        id="input_10"
                        v-model="form.name"
                        @blur="v$.name.$touch"
                        :class="{ error: v$.name.$error }"
                      />
                      <div v-if="v$.name.$error" class="error-message">
                        <span>Поле обязательно для заполнения</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="popup_call__form_item">
                  <div class="form_input">
                    <label class="form_input__label" for="input_11"
                      >Введите номер телефона</label
                    >
                    <div class="form_input__field">
                      <MaskInput
                        type="tel"
                        v-model="form.phone"
                        @blur="v$.phone.$touch"
                        :class="[
                          { error: v$.phone.$error },
                          'form_input__element',
                        ]"
                        mask="+7 (###) ###-##-##"
                      />
                      <div v-if="v$.phone.$error" class="error-message">
                        <span>Поле обязательно для заполнения</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Зона для перетаскивания файлов -->
                <div
                  v-if="modalData === 'price'"
                  class="popup_call__form_item popup_call__form_item--file"
                  @dragover.prevent="onDragOver"
                  @dragleave.prevent="onDragLeave"
                  @drop.prevent="onDrop"
                  :class="{ 'file-dragging': isDragging }"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    @change="onFileChange"
                    hidden
                  />
                  <label for=""
                    >Перетащите файл сюда или
                    <span @click="triggerFileInput">выберите файл</span></label
                  >

                  <!-- Preview файла -->
                  <div v-if="files.file" class="file-preview">
                    <div v-if="isImage(files.file)" class="image-preview">
                      <img :src="filePreviewUrl" alt="file preview" />
                    </div>
                    <div v-else class="file-info">
                      <span>{{ files.file.name }}</span>
                      <div class="remove-file" @click="removeFile">
                        <Icons icon="clarity:close-line" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="popup_call__form_item">
                  <input
                    class="popup_call__form_submit btn_base"
                    type="button"
                    value="Получить консультацию"
                    @click="submitForm"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="popup_call__info">
            Нажимая “Получить консультацию” вы соглашаетесь с
            <RouterLink to="/privacy/">политикой конфидециальности</RouterLink>
          </div>
        </div>
      </div>
      <div class="loader" v-if="isLoading">
        <Icons icon="svg-spinners:ring-resize" :size="100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useModalStore, useModalStoreRefs } from "@/stores/useModalStore";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { useTelegram } from "@/composables/useTelegram";

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const files = reactive<{ file: File | null }>({ file: null });
const filePreviewUrl = ref<any>(null);
const {
  sendFormWithoutFile,
  sendFormWithFile,
  isLoading,
  isSuccess,
  errorMessage,
} = useTelegram();

const form = reactive({
  name: "",
  phone: "",
  file: null,
});

const rules = {
  name: { required, minLength: minLength(2) },
  phone: {
    required,
  },
};

const v$ = useVuelidate(rules, form);

const { closeAllModals } = useModalStore();
const { modalData } = useModalStoreRefs();

const submitForm = async () => {
  v$.value.$touch(); // Активируем валидацию
  if (v$.value.$invalid) {
    console.log("Форма содержит ошибки.");
  } else {
    try {
      // Проверяем, есть ли файл
      if (files.file) {
        await sendFormWithFile(form.name, form.phone, files.file); // Отправляем данные с файлом
      } else {
        await sendFormWithoutFile(form.name, form.phone);
      }
      resetForm();
      closeAllModals();
    } catch (error: any) {
      // Выводим более подробную информацию об ошибке
      console.error(
        "Ошибка при отправке данных:",
        error?.message || error,
        error
      );
    }
  }
};

const resetForm = () => {
  form.name = "";
  form.phone = "";
  files.file = null;
  filePreviewUrl.value = null;

  // Проверяем, существует ли элемент fileInput перед сбросом его значения
  if (fileInput.value) {
    fileInput.value.value = ""; // Сбрасываем input file, если он существует
  }
};

// Определяем, является ли файл изображением
const isImage = (file: File) => {
  return file.type.startsWith("image/");
};

const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const onDrop = (event: DragEvent) => {
  const droppedFiles = event.dataTransfer?.files;
  if (droppedFiles && droppedFiles.length > 0) {
    files.file = droppedFiles[0];
    generateFilePreview(files.file);
  }
  isDragging.value = false;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    files.file = target.files[0];
    generateFilePreview(files.file);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

// Генерация preview для изображений
const generateFilePreview = (file: File) => {
  if (isImage(file)) {
    const reader = new FileReader();
    reader.onload = () => {
      filePreviewUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    filePreviewUrl.value = null;
  }
};

// Очистка выбранного файла
const removeFile = () => {
  files.file = null;
  filePreviewUrl.value = null;
  fileInput.value!.value = ""; // Очищаем input
};
</script>

<style scoped lang="scss">
.popup_call__form_item--file {
  border: 0.2rem dashed #ccc;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &.file-dragging {
    border-color: #007bff;
    background-color: rgba(0, 123, 255, 0.1);
  }

  label {
    display: inline-block;
    cursor: pointer;

    span {
      color: #007bff;
      text-decoration: underline;
    }
  }

  .file-preview {
    margin-top: 15px;

    .image-preview {
      img {
        max-width: 100%;
        max-height: 200px;
        object-fit: cover;
      }
    }

    .file-info {
      font-size: 14px;
      color: #555;
      display: flex;
      align-items: center;
      // justify-content: space-between;

      .remove-file {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.8rem;
        margin-left: 1rem;
        color: red;
      }
    }
  }
}

.error-message {
  color: red;
  padding: 1rem;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff70;
  backdrop-filter: blur(2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2c593;
}

.popup__in {
  max-height: 97dvh;
  overflow-y: auto;
  scrollbar-width: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.popup--contact {
  @media (max-width: 767px) {
    transform: translateY(0);
    top: auto;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
