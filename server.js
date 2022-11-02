const express = require("express");
const app = express();

const options = {
    dotfiles: "ignore",
    etag: false,
    index: ["index.html"],
    redirect: false
}
app.use(express.static("dist", options))

app.listen(process.env.PORT || 80)
