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

main();
