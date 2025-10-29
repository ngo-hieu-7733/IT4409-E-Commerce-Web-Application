import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import nodemailer, { Transporter } from 'nodemailer';
import { QueueName } from './queue.interface';

@Processor(QueueName.SEND_EMAIL)
export class SendEmailConsumer extends WorkerHost {
    private readonly transporter: Transporter;
    private readonly transporter2: Transporter;

    constructor() {
        super();

        // Server chính (SMTP riêng hoặc Gmail chính)
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Server dự phòng
        this.transporter2 = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL2_USER,
                pass: process.env.EMAIL2_PASSWORD,
            },
        });
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { to, subject, html } = job.data;
        console.log('📧 Sending email to:', to);

        try {
            const result = await this.transporter.sendMail({
                from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
                to,
                subject,
                html,
            });
            return true;
        } catch (error) {
            try {
                await this.transporter2.sendMail({
                    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL2_USER}>`,
                    to,
                    subject,
                    html,
                });
                return true;
            } catch (backupError) {
                console.log('📧 Email sent failed:', backupError);
                throw backupError;
            }
        }
    }
}
