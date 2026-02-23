import { useAuth } from './useAuth';

export function useRole() {
  const { user } = useAuth();
  const role = user?.role || null;

  const hasRole = (roles) => {
    if (!role) return false;
    if (Array.isArray(roles)) return roles.includes(role);
    return role === roles;
  };

  const isAdmin = role === 'admin';
  const isManager = role === 'manager';
  const isCaster = role === 'caster';

  return { role, hasRole, isAdmin, isManager, isCaster };
}
