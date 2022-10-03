export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export default function getPriorities() {
  return [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
}