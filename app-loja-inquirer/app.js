//ATIVIDADE 1: INPUT BÁSICO

/*
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
*/

//ATIVIDADE 2: SELECT - MENU

/*
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
*/

//ATIVIDADE 3: VALIDAÇÃO COM INPUT
/*

import { input, confirm } from '@inquirer/prompts';

async function main() {
  const nome = await input({
    message: 'Nome:'
  });
  
  const email = await input({
    message: 'Email:'
  });
  
  const confirmar = await confirm({
    message: `Confirma ${nome} - ${email}?`
  });
  
  if (confirmar) {
    console.log('✅ Dados confirmados!');
  } else {
    console.log('❌ Cancelado!');
  }
}

main();*/

