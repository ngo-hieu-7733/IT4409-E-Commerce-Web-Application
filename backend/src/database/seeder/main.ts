import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { AppModule } from 'src/app.module';


async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedService = app.get(SeederService);

    await seedService.run();
    await app.close();
}

bootstrap();
