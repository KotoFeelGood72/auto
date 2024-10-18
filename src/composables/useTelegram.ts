import { ref } from "vue";
import { useProjectsStoreRefs } from "@/stores/useProjectStore";
import axios from "axios";

export function useTelegram() {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref<string | null>(null);
  const { sendObject } = useProjectsStoreRefs();

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
        formData.append(
          "caption",
          `Имя: ${name}\nТелефон: ${phone}\nЗаявка на рассчет`
        );
        formData.append("chat_id", CHAT_ID);
        formData.append("document", file);

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
        await sendToTelegram(
          `Имя: ${name}\nТелефон: ${phone}\nЗаявка на рассчет`
        );
        ym(98477147, "reachGoal", "send_form");
      }
    } catch (error: any) {
      errorMessage.value = error.message || "Ошибка отправки";
    } finally {
      isLoading.value = false;
    }
  };

  // Метод для отправки формы без файла
  const sendFormWithoutFile = async (
    name: string,
    phone: string,
    date: string | null = null, // Добавляем параметр date
    title: string = "Заявка на консультацию" // Добавляем параметр title с дефолтным значением
  ) => {
    isLoading.value = true;
    isSuccess.value = false;
    errorMessage.value = null;

    try {
      // Формируем сообщение
      let message = `${title}\nИмя: ${name}\nТелефон: ${phone}`;

      // Если передана дата, добавляем ее в сообщение
      if (date) {
        message += `\nДата экскурсии: ${date}`;
      }

      // Проверяем, не пуст ли объект sendObject
      if (
        sendObject.value &&
        sendObject.value.title &&
        sendObject.value.complectation
      ) {
        message += `\n\nДетали проекта:\n`;
        message += `Название проекта: ${sendObject.value.title}`;
        message += `\nКомплектация: ${sendObject.value.complectation}`;
        if (sendObject.value.image) {
          message += `\nИзображение: ${sendObject.value.image}`;
        }
      }

      // Отправляем сообщение в Telegram
      await sendToTelegram(message);
      ym(98477147, "reachGoal", "send_form");
    } catch (error: any) {
      errorMessage.value = error.message || "Ошибка отправки";
    } finally {
      isLoading.value = false;
      sendObject.value = {
        image: "",
        title: "",
        complectation: "",
      };
    }
  };

  // Метод для отправки формы с quiz данными
  const sendFormWithQuiz = async (
    name: string,
    phone: string,
    quizAnswers: Array<{ title: string; image?: string }>
  ) => {
    isLoading.value = true;
    isSuccess.value = false;
    errorMessage.value = null;

    try {
      // Массив вопросов, сопоставленный с порядком ответов
      const questions = [
        "Есть ли у вас готовый проект?",
        "Какой дом вы желаете построить?",
        "Сколько этажей вы желаете:",
        "Какую площадь дома вы планируете?",
        "Какой облицовочный материал планируете использовать?",
        "Какой облицовочный материал кровли планируете использовать?",
        "Есть ли участок под строительство?",
        "Что бы вы хотели в дополнение к своему дому?",
        "Какой бюджет:",
        "Когда планируете строительство?",
        "При заказе дома от 100 м²",
      ];

      // Формируем сообщение, включая данные квиза
      let message = `Имя: ${name}\nТелефон: ${phone}\n\nЗаявка по квизу\nОтветы на квиз:\n`;

      // Проходим по массиву данных quiz и добавляем в сообщение вопросы и ответы
      quizAnswers.forEach((answer, index) => {
        const question = questions[index] || "Вопрос не найден"; // Подставляем вопрос или сообщение, если вопрос не найден
        message += `${index + 1}. Вопрос: ${question}\nОтвет: ${answer.title}`;
        if (answer.image) {
          message += `\n(Изображение: ${answer.image})`;
        }
        message += "\n\n"; // Добавляем разделение между вопросами для удобства чтения
      });

      // Отправляем сообщение в Telegram
      await sendToTelegram(message);
      ym(98477147, "reachGoal", "quiz");
      ym(98477147, "reachGoal", "send_form");
    } catch (error: any) {
      errorMessage.value = error.message || "Ошибка отправки данных quiz";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sendToTelegram,
    sendFormWithFile,
    sendFormWithoutFile,
    sendFormWithQuiz, // Новый метод для отправки формы с quiz
    isLoading,
    isSuccess,
    errorMessage,
  };
}
