import { Database } from "@vuex-orm/core";
import Board from "@/models/Board";
import KanbanColumn from "@/models/KanbanColumn";
import Task from "@/models/Task";

const database = new Database();

database.register(Board);
database.register(KanbanColumn);
database.register(Task);
// TODO: implement Subtask

export default database;
