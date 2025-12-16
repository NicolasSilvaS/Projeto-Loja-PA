import { input } from '@inquirer/prompts';

async function main() {
  const nome = await input({
    message: 'Qual é seu nome?'
  });
  
  const email = await input({
    message: 'Qual é seu email?'
  });
  
  console.log(`\n✅ ${nome} - ${email}`);
}

main();