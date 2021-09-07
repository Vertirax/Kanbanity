import KanbanColumn from "./KanbanColumn";

export default class Board {
  constructor(
    public id: string,
    public name?: string,
    public description?: string,
    public columns?: KanbanColumn
  ) {}
}
