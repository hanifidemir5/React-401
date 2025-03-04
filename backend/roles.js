import AccessControl from "accesscontrol";

const ac = new AccessControl();

export function roles() {
  ac.grant("user".readAny("product"));
  ac.grant("admin").extend("user").createAny("product");

  return ac;
}
