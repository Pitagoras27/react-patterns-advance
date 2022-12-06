import { ClapCount } from "./ClapCount";
import { ClapCountTotal } from "./ClapCountTotal";
import { ClapIcon } from "./ClapIcon";
import { MediumClap as MediumClapHOC } from "./MediumClap";

export { ClapCount } from "./ClapCount";
export { ClapCountTotal } from "./ClapCountTotal";
export { ClapIcon } from "./ClapIcon";
export { ShowInformationCount } from "./ShowInformationCount";

export const MediumClap = Object.assign(MediumClapHOC, {
  Count: ClapCount,
  CountTotal: ClapCountTotal,
  Icon: ClapIcon
});

