import { defineEventHandler } from 'h3';
import { getAuthUser } from '../../utils/auth';

export default defineEventHandler((event) => {
  const user = getAuthUser(event);

  if (!user) {
    return {
      authenticated: false,
      user: null
    };
  }

  return {
    authenticated: true,
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      groups: user.groups
    }
  };
});
