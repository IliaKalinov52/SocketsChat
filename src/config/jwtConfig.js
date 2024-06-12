const jwtConfig = {
  access: {
    expiresIn: 1000 * 3,
  },
  refresh: {
    expiresIn: 1000 * 60 * 60 * 12,
  },
};

export default jwtConfig;
