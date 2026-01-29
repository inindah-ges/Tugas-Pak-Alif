const express = require("express");
const app = express();
const port = 3006;
const router = require("./router/router");
const errorhandler = require ("./middleware/errorhandler")
app.use(express.json());

app.use("/", router);

app.use(errorhandler);
message: "haiiii kamuuu"

app.listen(port, () => {
  console.log("server running on port http://localhost:3006");
});
