import fetch from 'node-fetch';
export const verifyToken = async (user) => {
  const body = {
    user: user,
  };
  const response = await fetch('/api/resume', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  //   const tokenVerified = await response.json();

  return { user: verified };
};
