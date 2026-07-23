export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

export const ROLE_LEVEL = {
  [ROLES.USER]: 1,
  [ROLES.ADMIN]: 2,
  [ROLES.SUPERADMIN]: 3,
};

export const ALL_ROLES = Object.values(ROLES);

export function hasMinRole(userRole, minRole) {
  return (ROLE_LEVEL[userRole] ?? 0) >= (ROLE_LEVEL[minRole] ?? 999);
}

export function canManageRole(actorRole, targetRole) {
  if (actorRole === ROLES.SUPERADMIN) {
    return targetRole !== ROLES.SUPERADMIN || actorRole === ROLES.SUPERADMIN;
  }

  if (actorRole === ROLES.ADMIN) {
    return targetRole === ROLES.USER;
  }

  return false;
}
