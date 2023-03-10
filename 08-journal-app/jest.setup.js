// En caso de necesitar la implementación del FetchAPI
import "whatwg-fetch"; // <-- yarn add whatwg-fetch
import "setimmediate";
import { getEnvironments } from "./src/helpers/getEnvironments";

require("dotenv").config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
  // Cuando se mande a llamar al getEnvironments, regresara un objeto con todas las variables de entorno
}));
