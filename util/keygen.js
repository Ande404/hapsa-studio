import { nanoid } from 'nanoid/async';

export async function keygen(key) {
  const randomId = await nanoid();

  const cleanedKey = key.toLowerCase().split(' ').join('-').concat(randomId);

  return key.concat(cleanedKey);
}
