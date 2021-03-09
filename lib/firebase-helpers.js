import { nanoid } from 'nanoid/async';

export async function keygen(key) {
  const randomId = await nanoid();

  const cleanedKey = key.toLowerCase().split(' ').join('-').concat(randomId);

  return key.concat(cleanedKey);
}

export const timestampAuth = () => {
  const today = new Date();

  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return `${date} ${time}`;
};

export const formatUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user?.displayName,
  provider: Array.isArray(user.providerData)
    ? user?.providerData[0].providerId
    : user?.providerData,
  photoUrl: user?.photoURL,
});
