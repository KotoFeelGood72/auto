import { defineStore, storeToRefs } from "pinia";
import axios from "axios";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: null as any, // Инициализируем проекты как null
  }),
  actions: {
    async getProjects() {
      try {
        const response = await axios.get("/projects.json");
        this.projects = response.data;
        this.addIconNamesToCharacters(); // Вызываем метод для добавления иконок
      } catch (error) {
        console.error("Ошибка при получении проектов:", error);
      }
    },
    getProjectById(id: any) {
      if (this.projects) {
        return this.projects.find((project: any) => project.id === id);
      }
      return null;
    },
    addIconNamesToCharacters() {
      if (this.projects && Array.isArray(this.projects)) {
        this.projects.forEach((project: any) => {
          if (project.characters && Array.isArray(project.characters)) {
            project.acf.characters = project.acf.characters.map(
              (character: any) => {
                character.iconName = `icon-${character.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`;
                return character;
              }
            );
          }
        });
      }
    },
  },
});

export const useProjectsStoreRefs = () => storeToRefs(useProjectsStore());
