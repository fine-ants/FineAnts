import { setupWorker } from "msw";
import handlers from "./handlers/index";

export default setupWorker(...handlers);
