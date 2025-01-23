import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendContractEmail(to: string, contract: string) {
  const msg = {
    to,
    from: 'your-email@example.com',
    subject: 'Contract Agreement',
    text: `Here is your contract: ${contract}`,
  };
  console.log(msg)
//   await sgMail.send(msg);
}