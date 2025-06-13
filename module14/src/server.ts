require("dotenv").config();
import app from "./app";
import client from "./config/mongodb";

const bootstrap = async () => {
  try {
    await client.connect();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

bootstrap();
