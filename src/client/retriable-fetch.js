const createRetriableFetch = ({ endpoint, storage, cache, onLogin, onLogout, refreshTokenMutation }) => async (uri, options) => {
  try {
    const initialReq = fetch(uri, options);
    const initialRes = await initialReq;

    if (initialRes.status === 401) {
      throw new Error('UnauthorizedError');
    }

    return initialRes.clone();
  } catch (e) {
    try {
      if (e.message === 'UnauthorizedError') {
        const { refreshToken, user } = storage;
        const { newAccessToken, newRefreshToken } = await getNewToken(endpoint, refreshToken, user, refreshTokenMutation);
        onLogin(storage, cache, user, newAccessToken, newRefreshToken);

        options.headers.authorization = newAccessToken;
        return fetch(uri, options);
      }
    } catch (error) {
      onLogout(storage, cache);
    }
  }
};


async function getNewToken(endpoint, refreshToken, user, refreshTokenMutation) {
  const res = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      query: refreshTokenMutation,
      variables: {
        userId: user.id,
        refreshToken,
      },
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw Error('Not Ok');
  }

  const json = await res.json();

  if (json.errors && json.errors[0]) {
    throw json.errors[0];
  }

  const { token: newAccessToken, refreshToken: newRefreshToken } = json.data.refreshToken;

  return { newAccessToken, newRefreshToken };
}

export default createRetriableFetch;
