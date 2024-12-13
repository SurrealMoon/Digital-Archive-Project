import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '1d', // Token 1 gün geçerli
  });
};

const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET || "defaultrefreshsecret", {
    expiresIn: "7d", // Refresh token geçerlilik süresi
  });
};

export { generateToken, generateRefreshToken };