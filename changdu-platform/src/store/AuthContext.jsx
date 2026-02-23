import React, { createContext, useState, useCallback } from 'react';
import testAccountData from '../data/testAccount.json';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [onboardingStatus, setOnboardingStatus] = useState('none');

  const login = useCallback((identifier, password) => {
    const account = testAccountData.accounts.find(
      (a) =>
        (a.phone === identifier || a.email === identifier) &&
        a.password === password
    );
    if (account) {
      setUser({
        id: account.id,
        name: account.name,
        phone: account.phone,
        email: account.email,
        role: account.role,
        roleLabel: account.roleLabel,
        company: account.company,
        parentId: account.parentId || null,
      });
      setOnboardingStatus(account.onboardingStatus);
      return { success: true, onboardingStatus: account.onboardingStatus };
    }
    return { success: false, error: '账号或密码错误' };
  }, []);

  const register = useCallback((phone, name) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: name || '新用户',
      phone,
      email: '',
      role: 'admin',
      roleLabel: '集团账号',
      company: '',
      parentId: null,
    };
    setUser(newUser);
    setOnboardingStatus('none');
    return { success: true, onboardingStatus: 'none' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOnboardingStatus('none');
  }, []);

  const updateOnboardingStatus = useCallback((status) => {
    setOnboardingStatus(status);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    onboardingStatus,
    login,
    register,
    logout,
    updateOnboardingStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
