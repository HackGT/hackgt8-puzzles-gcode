import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import morgan from"morgan";
import fs from "fs";
import path from "path";

dotenv.config();

const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;

const PORT = process.env.PORT || 3000;



export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use(express.json({limit: "300kb"}));
app.use(express.urlencoded({extended:true, limit: "300kb"}));

import { submitRoutes } from "./routes/submit"
import { isAuthenticated } from "./auth/auth";
import { authRoutes } from "./routes/auth";

process.on("unhandledRejection", err => {
    throw err;
});

app.use("/checkanswer", submitRoutes);
app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/dist")));
app.get("/submit", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "submitform.html"))
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/public/MAKEITplace.tar.gz"));
});

app.listen(PORT, () => {
    console.log(`HackGT8 GCODE puzzle v${VERSION_NUMBER} started on port ${PORT}`);

});
