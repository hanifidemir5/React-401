import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("user").readAny("product").createAny("order");
ac.grant("admin").extend("user").createAny("product");

export function roles() {
  return ac;
}
