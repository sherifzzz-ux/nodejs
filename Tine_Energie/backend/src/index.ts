import app from './app';
import env from './config/env';

const PORT = env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
