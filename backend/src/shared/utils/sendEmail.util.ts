import {
    genHtmlForgotPasswordStore,
    genHtmlRegisterOtp,
    genHtmlStoreAccount,
    genHtmlStoreAccountReject,
    genHtmlVerifyForgotEmail,
} from '../../modules/send-email/genHTML.util';

const nodemailer = require('nodemailer');

export async function sendMailRegisterOtp(
    to: string,
    subject: string,
    otp: string,
    mode: string = 'prod',
) {
    if (mode === 'dev') {
        to = 'thaihieu1929@gmail.com';
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: genHtmlRegisterOtp(otp),
        });

        return true;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return false;
    }
}

export async function sendMailForgotPasswordOtp(
    to: string,
    subject: string,
    otp: string,
    mode: string = 'prod',
) {
    let a = to;
    if (mode === 'dev') {
        to = 'thaihieu1929@gmail.com';
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: genHtmlVerifyForgotEmail(a, otp),
        });
        return true;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return false;
    }
}

export async function sendMailStoreAccount(
    to: string,
    subject: string,
    data: any,
    mode: string = 'prod',
) {
    if (mode === 'dev') {
        to = 'thaihieu1929@gmail.com';
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: genHtmlStoreAccount(
                data.fullName,
                data.username,
                data.password,
            ),
        });
        return true;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return false;
    }
}

export async function sendMailStoreAccountReject(
    to: string,
    subject: string,
    data: any,
    mode: string = 'prod',
) {
    if (mode === 'dev') {
        to = 'thaihieu1929@gmail.com';
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: genHtmlStoreAccountReject(data.fullName),
        });
        return true;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return false;
    }
}

export async function sendMailForgotPasswordStore(
    to: string,
    subject: string,
    data: any,
    mode: string = 'prod',
) {
    if (mode === 'dev') {
        to = 'thaihieu1929@gmail.com';
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to,
            subject,
            html: genHtmlForgotPasswordStore(
                data.storename,
                data.password,
                data.email,
            ),
        });
        return true;
    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        return false;
    }
}
