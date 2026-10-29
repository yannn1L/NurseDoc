import { NurseDocument } from "../../types";
import { LP_DOCUMENTS } from "./lp";
import { ASKEP_DOCUMENTS } from "./askep";
import { LOGBOOK_DOCUMENTS } from "./logbook";
import { SOP_DOCUMENTS } from "./sop";

export * from "./lp";
export * from "./askep";
export * from "./logbook";
export * from "./sop";

export const DOCUMENTS: NurseDocument[] = [
  ...LP_DOCUMENTS,
  ...ASKEP_DOCUMENTS,
  ...LOGBOOK_DOCUMENTS,
  ...SOP_DOCUMENTS,
];

export default DOCUMENTS;
