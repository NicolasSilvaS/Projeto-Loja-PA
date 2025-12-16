import { input } from '@inquirer/prompts';

async function main() {
  const nome = await input({
    message: 'Nome:',
    validate: (valor) => {
      if (!valor || valor.trim() === '') {
        return 'Nome é obrigatório';
      }
      if (valor.length < 3) {
        return 'Nome deve ter pelo menos 3 caracteres';
      }
      return true;
    }
  });
  
  const email = await input({
    message: 'Email:',
    validate: (valor) => {
      if (!valor || !valor.includes('@')) {
        return 'Email inválido';
      }
      return true;
    }
  });
  
  console.log(`\n✅ ${nome} - ${email}`);
}

main();