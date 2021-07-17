import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import compression from "compression";
import morgan from"morgan";
import fs from "fs";
import path from "path";
import passport from 'passport';
import session from 'express-session';
import { GroundTruthStrategy } from './auth/strategies';


const VERSION_NUMBER = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8")).version;

const PORT = process.env.PORT || 3000;

console.log(process.env.SECRET);

export let app = express();
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use(express.json({limit: "300kb"}));
app.use(express.urlencoded({extended:true, limit: "300kb"}));


const session_secret = process.env.SECRET;
if (!session_secret) {
    throw new Error("Secret not specified");
}
app.use(session({
    secret: session_secret,
    saveUninitialized: false,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

export function loggedInErr(req, res, next) {
    if (req.user) {
        res.status(200).json({
            success: true,
        });
        next();
    } else {
        res.status(401).json({ error: "User not logged in", success: false });
        return;
    }
}

const gturl = String(process.env.GROUND_TRUTH_URL || "login.dev.hack.gt");
const groundTruthStrategy = new GroundTruthStrategy(gturl);
passport.use(groundTruthStrategy);



import { submitRoutes } from "./routes/submit"
import { isAuthenticated } from "./auth/auth";
import { authRoutes } from "./routes/auth";

app.use("/auth", authRoutes);

process.on("unhandledRejection", err => {
    throw err;
});


app.use("/submit", isAuthenticated, submitRoutes);
app.use(isAuthenticated, express.static(path.join(__dirname, "../../client/dist")));
//app.get("/", isAuthenticated, (req, res) => {
//    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"))
//})

app.get("*", (req, res) => {
    res.redirect("https://www.youtube.com/watch?v=lg5WKsVnEA4")
});

app.listen(PORT, () => {
    console.log(`HackGT8 GCODE puzzle v${VERSION_NUMBER} started on port ${PORT}`);

});
