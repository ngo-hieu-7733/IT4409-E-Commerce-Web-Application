import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueName } from './queue.interface';
import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Processor(QueueName.SEND_EMAIL)
export class SendEmailConsumer extends WorkerHost {
    private readonly transporter: Transporter;
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async process(job: Job<any, any, string>): Promise<any> {
        try {
            const { to, subject, html } = job.data;
            await this.transporter.sendMail({
                from: `${process.env.EMAIL_USER}`,
                to,
                subject,
                html,
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
