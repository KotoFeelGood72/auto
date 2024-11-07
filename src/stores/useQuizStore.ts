import { defineStore, storeToRefs } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    quiz: [] as any[],
    currentStep: 1,
    selectedOptions: [] as any[],
    steps: [
      {
        title: "Есть ли у вас готовый проект?",
        options: [
          { title: "Есть", image: "" },
          { title: "Нет", image: "" },
          { title: "Выберу из готовых вариантов", image: "" },
          { title: "Хочу заказать индивидуальный проект", image: "" },
        ],
      },
      {
        title: "Какой дом вы желаете построить?",
        options: [
          {
            title: "Дом с классической крышей",
            image:
              "https://www.ilya-stroy.ru/upload/iblock/d67/d673ae3a51eb74f56d4eb732bfad82f4.jpg",
          },
          {
            title: "Дом с плоской крышей",
            image: "https://delo-dom.ru/img/project/dd77/2.jpg",
          },
        ],
      },
      {
        title: "Сколько этажей вы желаете:",
        options: [
          { title: "1", image: "" },
          { title: "2", image: "" },
          { title: "1 + Мансарда", image: "" },
          { title: "2 + Мансарда", image: "" },
        ],
      },
      {
        title: "Какую площадь дома вы планируете?",
        options: [
          { title: "до 100 м²", image: "" },
          { title: "от 100 м² до 200 м²", image: "" },
          { title: "от 200 м² до 300 м²", image: "" },
          { title: "свыше 300 м²", image: "" },
        ],
      },
      {
        title: "Какой облицовочный материал планируете использовать?",
        options: [
          {
            title: "Облицовочный кирпич",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Декоративная штукатурка",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Сайдинги",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Искусственный камень",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Фасадные панели",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Другой материал",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
        ],
      },
      {
        title: "Какой облицовочный материал кровли планируете использовать?",
        options: [
          {
            title: "Черепица",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Фальцевая кровля",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Профнастил",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Наплавляемая кровля",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Мембрана",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Другой материал",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
        ],
      },
      {
        title: "Есть ли участок под строительство?",
        options: [
          { title: "Есть", image: "" },
          { title: "Нет", image: "" },
        ],
      },
      {
        title: "Что бы вы хотели в дополнение к своему дому?",
        options: [
          {
            title: "Терраса",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Ландшафтный дизайн ",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Забор",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Беседка",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Баня",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
          {
            title: "Другое",
            image:
              "https://st41.stpulscen.ru/images/product/518/225/718_big.png",
          },
        ],
      },
      {
        title: "Какой бюджет:",
        options: [
          { title: "до 6 млн ", image: "" },
          { title: "от 6 млн до 9 млн", image: "" },
          { title: "от 9 млн до 12 млн", image: "" },
          { title: "от 12 млн до 15 млн", image: "" },
          { title: "свыше 15 млн", image: "" },
        ],
      },
      {
        title: "Когда планируете строительство?",
        options: [
          { title: "в течение 2-3 мес", image: "" },
          { title: "в течение полугода", image: "" },
          { title: "в течение года", image: "" },
          { title: "еще не определился ", image: "" },
        ],
      },
      {
        title: "При заказе дома от 100 м²",
        options: [
          { title: "Биосептик", image: "" },
          { title: "Дизайн проект дома", image: "" },
          { title: "2% Скидка", image: "" },
        ],
      },
      {
        title: "Оставьте свои данные и менеджер свяжется с вами",
        name: "",
        phone: "",
      },
    ],
  }),
  actions: {
    initializeSelectedOptions() {
      this.selectedOptions = Array(this.steps.length).fill(null);
    },

    setSelectedOption(stepIndex: number, option: any) {
      this.selectedOptions[stepIndex] = option;
    },

    addQuizData(newData: any) {
      const exists = this.quiz.some(
        (data: any) =>
          data.step === newData.step &&
          data.selectedOption.title === newData.selectedOption.title
      );

      if (!exists) {
        this.quiz.push(newData);
      } else {
        console.warn("Этот вариант уже был выбран для данного шага.");
      }
    },

    updateCurrentStep(step: number) {
      this.currentStep = step;
    },

    nextStep() {
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
      }
    },

    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    isLastStep() {
      return this.currentStep === this.steps.length;
    },

    resetQuiz() {
      this.currentStep = 1;
      this.quiz = [];
      this.initializeSelectedOptions();
    },
  },
});

export const useQuizStoreRefs = () => storeToRefs(useQuizStore());
