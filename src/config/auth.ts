export default {
  jwt: {
    secret: process.env.APP_SECRET_KEY || 'anything',
    expiresIn: '1d',
  },
};
