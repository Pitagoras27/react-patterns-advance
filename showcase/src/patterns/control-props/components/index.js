import { MediumClap as MediumClapHOC } from "../MediumClap";
import { ClapCount } from "./ClapCount";
import { ClapCountTotal } from "./ClapCountTotal";
import { ClapIcon } from "./ClapIcon";

export { ClapCount } from "./ClapCount";
export { ClapCountTotal } from "./ClapCountTotal";
export { ClapIcon } from "./ClapIcon";

export const MediumClap = Object.assign(MediumClapHOC, {
  Count: ClapCount,
  CountTotal: ClapCountTotal,
  Icon: ClapIcon
});

