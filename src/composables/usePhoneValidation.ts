import { helpers } from "@vuelidate/validators";

/**
 * Валидатор номера телефона.
 * Проверяет:
 * 1. Номер начинается с "+7".
 * 2. Первая цифра после "+7" не равна "8".
 * 3. Общая структура соответствует формату +7 (XXX) XXX-XX-XX.
 */
export const phoneValidator = helpers.withMessage(
  "Введите корректный номер телефона (после +7 не должно быть 8)",
  (value: string) => {
    if (!value) return false; // Проверяем, что значение не пустое

    // Убираем пробелы, скобки, дефисы
    const cleanedValue = value.replace(/[\s()-]/g, "");

    // Проверяем, что номер начинается с +7 и первая цифра после кода не "8"
    return /^(\+7)([1-79]\d{9})$/.test(cleanedValue);
  }
);

/**
 * Хук для работы с телефонными номерами.
 */
export const usePhoneValidation = () => {
  /**
   * Блокировка ввода цифры `8` как первой после кода страны.
   * @param event - Событие ввода клавиатуры.
   */
  const blockInvalidInput = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;

    // Если пользователь вводит "8" на позиции первой цифры после "+7", блокируем ввод
    if (
      target.value.startsWith("+7 (") &&
      (target.value === "+7 (8" ||
        (target.value.length === 5 && event.key === "8"))
    ) {
      event.preventDefault();
    }

    // Если поле пустое и вводится "8", блокируем
    if (target.value === "" && event.key === "8") {
      event.preventDefault();
    }
  };

  /**
   * Корректировка значения при вводе.
   * @param event - Событие ввода.
   */
  const handlePhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    // Убираем пробелы, скобки, дефисы
    const cleanedValue = target.value.replace(/[\s()-]/g, "");

    // Если номер содержит "8" после "+7", удаляем "8"
    if (cleanedValue.length > 2 && cleanedValue.charAt(2) === "8") {
      const correctedValue =
        "+7 (" +
        cleanedValue.slice(3, 6) +
        ") " +
        cleanedValue.slice(6, 9) +
        "-" +
        cleanedValue.slice(9, 11) +
        "-" +
        cleanedValue.slice(11, 13);

      target.value = correctedValue.trim();
    }
  };

  /**
   * Обработка при потере фокуса.
   * @param event - Событие потери фокуса.
   */
  const handleBlur = (event: Event) => {
    const target = event.target as HTMLInputElement;

    // Убираем пробелы, скобки, дефисы
    const cleanedValue = target.value.replace(/[\s()-]/g, "");

    // Если первая цифра после "+7" равна "8", удаляем её
    if (cleanedValue.length > 2 && cleanedValue.charAt(2) === "8") {
      const correctedValue =
        "+7 (" +
        cleanedValue.slice(3, 6) +
        ") " +
        cleanedValue.slice(6, 9) +
        "-" +
        cleanedValue.slice(9, 11) +
        "-" +
        cleanedValue.slice(11, 13);

      target.value = correctedValue.trim();
    }
  };

  return { phoneValidator, blockInvalidInput, handlePhoneInput, handleBlur };
};
