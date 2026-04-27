import { Topic, Resource } from '../types.ts';

/**
 * Service to handle WhatsApp communication.
 * In production, this would call a backend API (Twilio/Meta).
 * For this version, it generates highly optimized deep links.
 */
export class WhatsAppService {
  private static BASE_URL = 'https://wa.me/';
  private phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber.replace(/\D/g, '');
  }

  private generateLink(text: string): string {
    return `${WhatsAppService.BASE_URL}${this.phoneNumber}?text=${encodeURIComponent(text)}`;
  }

  /**
   * Sends a request for a PDF guide for a specific topic.
   */
  async requestPdfGuide(topic: Topic) {
    const text = `📚 *Mzansi CAPS Tutor Request*\n\nHi! Please send me the PDF Study Guide for:\n\n*Subject:* ${topic.id.split('-')[0]}\n*Topic:* ${topic.title}\n\nThank you!`;
    window.open(this.generateLink(text), '_blank');
  }

  /**
   * Sends a request for a speed quiz on a topic.
   */
  async requestQuiz(topic: Topic) {
    const text = `🧠 *Mzansi CAPS Tutor Speed Quiz*\n\nI'm ready for a quiz on *${topic.title}*.\n\nPlease send me 5 questions to test my knowledge!`;
    window.open(this.generateLink(text), '_blank');
  }

  /**
   * Sends a request for an interactive formula sheet.
   */
  async requestFormulaSheet(topic: Topic) {
    const text = `📐 *Mzansi CAPS Tutor Formula Request*\n\nHi! Please send me the essential formula sheet for *${topic.title}*.`;
    window.open(this.generateLink(text), '_blank');
  }

  /**
   * Simulates an ITN (Instant Transaction Notification) sync.
   * In a real app, this would be a webhook on the server.
   */
  static async syncPaymentStatus(userId: string): Promise<boolean> {
    // This would fetch from /api/payment-status or Firestore
    // For now, we simulate a successful check
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  }
}
