import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import { connectToDB } from "./dbUtils";
import { inventoryRouter } from "./api/inventory/inventoryRoute";

const app = express();
const PORT = 8000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);
app.use(jsonParser);
app.use(cors());

// Routes
app.use("/inventory", inventoryRouter);

connectToDB();

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
