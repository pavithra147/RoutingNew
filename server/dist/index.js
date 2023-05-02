"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
var corsOptions = {
    origin: "http://localhost:8081"
};
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedToplogy: true
}).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Cannot connect to the databse", err);
    process.exit();
});
app.get('/', (req, res) => {
    res.send('Express +Typescript Server');
});
app.listen(port, () => {
    console.log((`Server is running at http://localhost:${port}`));
});
