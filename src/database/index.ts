import { Database } from "@vuex-orm/core";
import Board from "@/models/Board";
import KanbanColumn from "@/models/KanbanColumn";
import Task from "@/models/Task";
import Notification from "@/models/Notification";

const database = new Database();

database.register(Board);
database.register(KanbanColumn);
database.register(Task);
// TODO: implement Subtask
database.register(Notification);

export default database;
