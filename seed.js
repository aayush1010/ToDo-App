var StatusENUM = {
  ACTIVE: "ACTIVE",
  COMPLETE: "COMPLETE",
  DELETED: "DELETED"
}

var todos = {
  1: {
    title: "Learn JavaScript",
    status: StatusENUM.ACTIVE
  },
  2: {
    title: "Learn NodeJS",
    status: StatusENUM.ACTIVE
  },
  3: {
    title: "Learn Git",
    status: StatusENUM.ACTIVE
  }
}

var next_todo_id = 4;

module.exports = {
  StatusENUM: StatusENUM,
  todos: todos,
  next_todo_id: next_todo_id
}
