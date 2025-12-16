import { select, input } from '@inquirer/prompts';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

async function adicionarCliente() {
  try {
    const nome = await input({
      message: 'Nome:',
      validate: (v) => v.length >= 3 || 'Mínimo 3 caracteres'
    });
    
    const email = await input({
      message: 'Email:',
      validate: (v) => v.includes('@') || 'Email inválido'
    });
    
    await client.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2)',
      [nome, email]
    );
    
    console.log('✅ Cliente adicionado!');
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
  }
}

async function listarClientes() {
  try {
    const resultado = await client.query(
      'SELECT id, nome, email FROM clientes ORDER BY nome'
    );
    
    console.log('\n📋 CLIENTES:');
    console.log('='.repeat(60));
    
    if (resultado.rows.length === 0) {
      console.log('Nenhum cliente cadastrado');
    } else {
      resultado.rows.forEach(cliente => {
        console.log(`[${cliente.id}] ${cliente.nome} - ${cliente.email}`);
      });
    }
    
    console.log('='.repeat(60));
  } catch (erro) {
    console.error('❌ Erro:', erro.message);
  } 
}

async function menu() {
  const opcao = await select({
    message: 'MENU PRINCIPAL',
    choices: [
      { name: '1. Adicionar Cliente', value: '1' },
      { name: '2. Listar Clientes', value: '2' },
      { name: '3. Sair', value: '3' }
    ]
  });
  
  switch(opcao) {
    case '1':
      await adicionarCliente();
      break;
    case '2':
      await listarClientes();
      break;
    case '3':
      console.log('Até logo!');
      await client.end();
      return;
  }
  
  await menu();
}

async function main() {
  try {
    await client.connect();   // 🔥 conexão abre AQUI
    await menu();             // menu roda
  } catch (erro) {
    console.error('Erro ao iniciar:', erro.message);
  }
}

main();