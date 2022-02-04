const decodeTokenData = (token) => {
    if (!token) {
        return {};
    }
    const tokenPieces = token.split(".");
    const tokenbase64 = tokenPieces[1];
    const decodedToken = atob(tokenbase64);
    return JSON.parse(decodedToken);
};

export default decodeTokenData;
