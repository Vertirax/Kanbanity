import { nanoid } from "nanoid";

export default class BoardTemplate {
  constructor(
    public id: string = nanoid(10),
    public name: string = "",
    public columns: string = ""
  ) {}
}
