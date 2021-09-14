import KanbanItem from "@/classes/KanbanItem";

export default class KanbanColumn {
  constructor(
    public id: string,
    public name?: string,
    // public headerColor?: string,
    public description?: string,
    public tasks?: KanbanItem
  ) {}
}
