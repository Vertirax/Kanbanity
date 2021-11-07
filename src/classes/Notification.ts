export default class Notification {
  constructor(
    public id?: string,
    public title?: string,
    public message?: string,
    public iconUrl?: string,
    public hour?: number,
    public minute?: number,
    public active?: boolean
  ) {}
}
