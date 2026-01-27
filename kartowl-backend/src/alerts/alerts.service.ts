import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AlertsService {
  private transporter;

  constructor() {
    // Use Gmail or any SMTP service
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Add to .env (e.g., yourgmail@gmail.com)
        pass: process.env.EMAIL_PASS  // Add to .env (App Password, not login password)
      }
    });
  }

  async sendConfirmation(email: string, productUrl: string, targetPrice: number) {
    await this.transporter.sendMail({
      from: '"KartOwl Alerts" <noreply@kartowl.com>',
      to: email,
      subject: 'Price Alert Set! 🔔',
      text: `You will be notified when the price drops below Rs ${targetPrice}.\nLink: ${productUrl}`,
      html: `<b>Alert Set!</b><br>We'll watch this product for you: <a href="${productUrl}">Link</a>`
    });
  }
}