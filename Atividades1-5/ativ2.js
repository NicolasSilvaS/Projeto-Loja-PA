import { select } from '@inquirer/prompts';

async function main() {
  const opcao = await select({
    message: 'Escolha uma opção:',
    choices: [
      { name: '1. Opção 1', value: '1' },
      { name: '2. Opção 2', value: '2' },
      { name: '3. Opção 3', value: '3' },
      { name: '4. Sair', value: '4' }
    ]
  });
  
  console.log(`Você escolheu: ${opcao}`);
}

main();