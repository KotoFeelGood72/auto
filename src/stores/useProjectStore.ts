import { defineStore, storeToRefs } from "pinia";
import { api } from "@/api/axios";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: null as any,
    sendObject: {
      image: null as string | null,
      title: null as string | null,
      complectation: null as string | null,
    },
  }),
  actions: {
    async getProjects() {
      try {
        const response = await api.get("/projects/all-projects.json");
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
    // Метод для обновления объекта sendObject
    setSendObject(image: string, title: string, complectation: string) {
      this.sendObject.image = image;
      this.sendObject.title = title;
      this.sendObject.complectation = complectation;
    },
  },
});

export const useProjectsStoreRefs = () => storeToRefs(useProjectsStore());
