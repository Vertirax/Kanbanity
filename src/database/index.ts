import { Database } from "@vuex-orm/core";
import Board from "@/models/Board";
import KanbanColumn from "@/models/KanbanColumn";
import Task from "@/models/Task";
import Notification from "@/models/Notification";
import Preferences from "@/models/Preferences";

const database = new Database();

database.register(Board);
database.register(KanbanColumn);
database.register(Task);
// TODO: implement Subtask
database.register(Notification);
database.register(Preferences);

export default database;
