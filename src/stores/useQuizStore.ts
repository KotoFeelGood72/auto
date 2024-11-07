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
              "https://i.pinimg.com/236x/4d/2a/b7/4d2ab79c00d86ea9fa93a5f32c2e12ad--dream-houses-doors.jpg?nii=t",
          },
          {
            title: "Дом с плоской крышей",
            image: "https://dom4m.ru/photos/prjmain/img1622_34741_480p.jpg",
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
              "https://likolorpro.ru/upload/resize_cache/iblock/a97/400_200_0/dm4xuymzwntjgg7q1awsitmi63n4axzh.jpg",
          },
          {
            title: "Декоративная штукатурка",
            image:
              "https://avatars.mds.yandex.net/i?id=b5f04ea4196c654bd45b63ae6e104b04_sr-5859172-images-thumbs&n=13",
          },
          {
            title: "Сайдинги",
            image:
              "https://st29.stpulscen.ru/images/product/259/113/881_medium3.jpg",
          },
          {
            title: "Искусственный камень",
            image:
              "https://perimetr-shop.ru/upload/iblock/810/h8hmfo0z2tpahxo9kgtiaea0mb7xhvjo/Iskusstvennyy-kamen-Baltfasad-Tobol-uglovoy-280_80_130mm-093.jpeg",
          },
          {
            title: "Фасадные панели",
            image:
              "https://avatars.mds.yandex.net/i?id=c6b23a965d80b3abe0373c3f31bb4879_l-12643411-images-thumbs&n=13",
          },
          {
            title: "Другой материал",
            image:
              "https://headlinermagazine.net/assets/image-cache/css/img/no-img.16f9bb3f.jpg",
          },
        ],
      },
      {
        title: "Какой облицовочный материал кровли планируете использовать?",
        options: [
          {
            title: "Черепица",
            image:
              "https://avatars.mds.yandex.net/i?id=f29bfba2d1f9c51e13c27d034e5876f2_sr-5680793-images-thumbs&n=13",
          },
          {
            title: "Фальцевая кровля",
            image:
              "https://durat.ru/wp-content/uploads/2020/12/b2dd964637795559e1e16481b5ce8e70.jpg",
          },
          {
            title: "Профнастил",
            image:
              "https://sun9-40.userapi.com/iyRe2mlZpFDFP-WlM6be8SteAckFunKano202A/_byS5_ZVnDI.jpg",
          },
          {
            title: "Наплавляемая кровля",
            image:
              "https://img5.lalafo.com/i/posters/api/1c/4d/2b/8d1b96c2cac9c27d7e39c02be4.jpeg",
          },
          {
            title: "Мембрана",
            image:
              "https://www.kpoem.ru/upload/iblock/9dc/9dc6c76fb3c5cb8ff33c6044fdd04ee4.jpg",
          },
          {
            title: "Другой материал",
            image:
              "https://headlinermagazine.net/assets/image-cache/css/img/no-img.16f9bb3f.jpg",
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
              "https://i.pinimg.com/736x/52/19/86/5219864e8e6cb7785a1162db6b8466e4.jpg",
          },
          {
            title: "Ландшафтный дизайн ",
            image: "https://i.ytimg.com/vi/fo4q-OGQlsU/mqdefault.jpg",
          },
          {
            title: "Забор",
            image:
              "https://vectorgroup.pro/assets/cache/images/sub/2/zabor_hero-320x230-d51.jpg",
          },
          {
            title: "Беседка",
            image:
              "https://disput-pmr.ru/data/ams/47/47798-5009bb4ceca1d3f7dba5c9e2371835b2.jpg",
          },
          {
            title: "Баня",
            image:
              "https://92.img.avito.st/image/1/1.pTDZlLauCdmPMYPen_aZew83Cw.qKDgNFrXBTYL3ScX8Z2GxZ2W7Hs0-uuSycXoooBgnFk",
          },
          {
            title: "Другое",
            image:
              "https://headlinermagazine.net/assets/image-cache/css/img/no-img.16f9bb3f.jpg",
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
          {
            title: "Биосептик",
            image:
              "https://avatars.mds.yandex.net/i?id=7fd6037c222646a3146e87a066d7f85a_sr-5301392-images-thumbs&n=13",
          },
          {
            title: "Дизайн проект дома",
            image:
              "https://avatars.mds.yandex.net/i?id=6680814050e59175ae541c8beee6c670_sr-5858040-images-thumbs&n=13",
          },
          {
            title: "2% Скидка",
            image:
              "https://avatars.mds.yandex.net/i?id=685234a3c39162e2753f5335257aa414_sr-12574745-images-thumbs&n=13",
          },
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
