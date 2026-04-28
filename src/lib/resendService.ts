import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_33jC159T_8G3wVU4QqJVzy4Jn4XPPnVcp');

export async function sendContactMail({ name, email, message }: { name: string; email: string; message: string }) {
  return resend.emails.send({
    from: 'info@levelupingermany.com',
    to: 'levelupdiaspo@gmail.com',
    subject: 'Neue Kontaktanfrage',
    html: `<p><b>Name:</b> ${name}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Nachricht:</b><br/>${message}</p>`,
  });
}
