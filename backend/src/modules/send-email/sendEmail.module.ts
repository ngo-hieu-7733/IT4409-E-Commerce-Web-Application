import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from './queue.interface';
import { SendEmailService } from './sendEmail.service';
import { SendEmailConsumer } from './sendEmail.consumer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: QueueName.SEND_EMAIL,
        }),
        
    ],
    providers: [SendEmailService, SendEmailConsumer],
    exports: [SendEmailService],
})
export class SendEmailModule {}
