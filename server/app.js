const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const initDataBase = require("./startUp/initDatabase");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  console.log("prodaction");
} else {
  console.log("development");
}

async function start() {
  // функция просто чтобы наш код был линейный ( мы могли прописать await) и сначала подключить базу, а потом уже код выполнять
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    }); // если бы было написано on - то каждый раз бы выполнялся, а так как once -  то ток один раз
    await mongoose.connect(config.get("mongoUri")); // сюда должны прописать путь к базе
    app.listen(PORT, () =>
      console.log(chalk.green(`server started on port ${PORT}`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1); // если ошибка то выходим нафиг из программы (код 1)
  }
}
start();
