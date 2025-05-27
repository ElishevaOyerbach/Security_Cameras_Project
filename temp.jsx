import { useSelector } from "react-redux";

const HasPermission = (permissionName, accessPermissions,role) => {

  if (role !== "Member") return true;
  if (!Array.isArray(accessPermissions)) return false;

  return accessPermissions.some(
    (perm) =>
      perm.sortPermissions === permissionName && perm.isPermissions === true
  );
};

export default HasPermission;
