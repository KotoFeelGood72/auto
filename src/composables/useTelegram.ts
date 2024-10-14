import { ref } from "vue";
import axios from "axios";

export function useTelegram() {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref<string | null>(null);

  const BOT_TOKEN = "7908792925:AAGQRAMNs6iVCFt0cBA8Dq7pyF4j0hTrUAM";
  const CHAT_ID = "-1002402116927";

  // Отправка сообщения в Telegram
  const sendToTelegram = async (message: string) => {
    isLoading.value = true;
    isSuccess.value = false;
    errorMessage.value = null;

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }
      );
      if (response.status === 200) {
        isSuccess.value = true;
      } else {
        throw new Error("Ошибка при отправке сообщения");
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Ошибка отправки сообщения";
    } finally {
      isLoading.value = false;
    }
  };

  // Метод для отправки файла или документа вместе с данными
  const sendFormWithFile = async (
    name: string,
    phone: string,
    file: File | null
  ) => {
    isLoading.value = true;
    isSuccess.value = false;
    errorMessage.value = null;

    try {
      if (file) {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("document", file);
        formData.append("caption", `Имя: ${name}\nТелефон: ${phone}`);

        const response = await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
          formData
        );

        if (response.status === 200) {
          isSuccess.value = true;
        } else {
          throw new Error("Ошибка при отправке файла");
        }
      } else {
        await sendToTelegram(`Имя: ${name}\nТелефон: ${phone}`);
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Ошибка отправки";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sendToTelegram,
    sendFormWithFile,
    isLoading,
    isSuccess,
    errorMessage,
  };
}
