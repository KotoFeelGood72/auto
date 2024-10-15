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
                        value=""
                      />
                    </div>
                  </div>
                </div>
                <div class="popup_call__form_item">
                  <div class="form_input">
                    <label class="form_input__label" for="input_11"
                      >Введите номер телефона</label
                    >
                    <div class="form_input__field">
                      <input
                        class="form_input__element"
                        type="text"
                        id="input_11"
                        value=""
                      />
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
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="popup_call__info">
            Нажимая “Получить консультацию” вы соглашаетесь с
            <a href="#">политикой конфидециальности</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useModalStore, useModalStoreRefs } from "@/stores/useModalStore";

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const files = reactive<{ file: File | null }>({ file: null });
const filePreviewUrl = ref<any>(null);

const { closeAllModals } = useModalStore();
const { modalData } = useModalStoreRefs();

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
  border: 2px dashed #ccc;
  padding: 20px;
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
        font-size: 18px;
        margin-left: 10px;
        color: red;
      }
    }
  }
}
</style>
