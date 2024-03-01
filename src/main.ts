import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://ints-internreport-fe.vercel.app/',
    ],
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization',
  });
  await app.listen(port);
  console.log(`App started. Listening on port ${port}`);
}
bootstrap().catch((err) => {
  console.log(`Fatal error during initialization:`, err);
  process.exit(1);
});
