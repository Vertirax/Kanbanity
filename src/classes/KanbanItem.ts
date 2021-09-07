import { Priority } from "@/enums/Priorities";

export default class KanbanItem {
  constructor(
    public id: string,
    public name?: string,
    public description?: string,
    public priority?: Priority
  ) {}
}
