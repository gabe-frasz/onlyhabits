import { app } from "./app";
import { env } from "./env";

const PORT = env.PORT;

app
  .listen({ port: PORT })
  .then(() => console.log(`Running on port ${PORT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
