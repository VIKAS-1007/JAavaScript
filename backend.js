const express = require("express");
const port = 5555;
const app = express();

const db = [
  [
    {
      id: 1,
      title: "Todo 1",
      description: "This is todo 1",
      completed: false,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "This is todo 3",
      completed: false,
    },
    {
      id: 4,
      title: "Todo 4",
      description: "This is todo 4",
      completed: false,
    },
    {
      id: 5,
      title: "Todo 5",
      description: "This is todo 5",
      completed: false,
    },
  ],
  [
    {
      id: 2,
      title: "Todo 2",
      description: "This is todo 2 bitch!",
      completed: true,
    },
    {
      id: 7,
      title: "Todo 7",
      description: "Seven seven",
      completed: true,
    },
  ],
  [
    {
      id: 1,
      title: "Todo 1",
      description: "This is todo 1",
      completed: true,
    },
    {
      id: 2,
      title: "Todo 2",
      description: "This is todo 2",
      completed: false,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "This is todo 3 in one",
      completed: false,
    },
  ],
  [
    {
      id: 2,
      title: "Todo 2 apparently",
      description: "This is todo 2 now piss off",
      completed: true,
    },
    {
      id: 3,
      title: "Todo 3",
      description: "This is todo 3",
      completed: false,
    },
    {
      id: 5,
      title: "Todo 5",
      description: "This is todo 5",
      completed: false,
    },
  ],
];

app.get("/getData", (req, res) => {
  let magic = Math.floor(Math.random() * 4) + 0;
  console.log(magic);
  res.json({
    data: db[magic],
  });
});

app.listen(port);
