    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    require("dotenv").config();

    const app = express();

    app.use(cors());
    app.use(express.json());

    const contactRoutes = require("./routes/contactRoutes");
    app.use("/api/contact", contactRoutes);

    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log(err));

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log("Server running on 5000");
    });
