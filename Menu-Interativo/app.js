// ===============================
// ATIVIDADE 5: MENU INTERATIVO
// ===============================

// Importa os prompts do Inquirer
import { select, input, confirm } from '@inquirer/prompts';

// Importa o cliente do PostgreSQL
import { Client } from 'pg';

// Importa e configura as variáveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

// Cria o cliente de conexão com o banco
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

// ===============================
// FUNÇÃO: ADICIONAR CLIENTE
// ===============================
async function adicionarCliente() {
  try {
    // Solicita o nome do cliente com validação
    const nome = await input({
      message: 'Nome:',
      validate: (v) => v.length >= 3 || 'Mínimo 3 caracteres'
    });

    // Solicita o email com validação
    const email = await input({
      message: 'Email:',
      validate: (v) => v.includes('@') || 'Email inválido'
    });

    // Confirma os dados antes de salvar
    const confirmarDados = await confirm({
      message: `Confirmar cliente ${nome} - ${email}?`,
      default: true
    });

    // Se o usuário cancelar, não salva
    if (!confirmarDados) {
      console.log('❌ Operação cancelada');
      return;
    }

    // Insere o cliente no banco
    await client.query(
      'INSERT INTO clientes (nome, email) VALUES ($1, $2)',
      [nome, email]
    );

    console.log('✅ Cliente adicionado com sucesso!');
  } catch (erro) {
    // Tratamento de erro
    console.error('❌ Erro ao adicionar cliente:', erro.message);
  }
}

// ===============================
// FUNÇÃO: LISTAR CLIENTES
// ===============================
async function listarClientes() {
  try {
    // Consulta os clientes cadastrados
    const resultado = await client.query(
      'SELECT id, nome, email FROM clientes ORDER BY nome'
    );

    console.log('\n📋 CLIENTES CADASTRADOS');
    console.log('='.repeat(50));

    // Verifica se existem clientes
    if (resultado.rows.length === 0) {
      console.log('Nenhum cliente cadastrado');
    } else {
      // Exibe os clientes
      resultado.rows.forEach((cliente) => {
        console.log(`[${cliente.id}] ${cliente.nome} - ${cliente.email}`);
      });
    }

    console.log('='.repeat(50));
  } catch (erro) {
    // Tratamento de erro
    console.error('❌ Erro ao listar clientes:', erro.message);
  }
}

// ===============================
// FUNÇÃO: MENU PRINCIPAL
// ===============================
async function menu() {
  let sair = false;

  // Mantém o menu em execução
  while (!sair) {
    const opcao = await select({
      message: 'MENU PRINCIPAL',
      choices: [
        { name: 'Adicionar Cliente', value: 'add' },
        { name: 'Listar Clientes', value: 'list' },
        { name: 'Sair', value: 'exit' }
      ]
    });

    // Controle das opções do menu
    switch (opcao) {
      case 'add':
        await adicionarCliente();
        break;

      case 'list':
        await listarClientes();
        break;

      case 'exit':
        sair = true;
        console.log('👋 Até logo!');
        break;
    }
  }
}

// ===============================
// FUNÇÃO PRINCIPAL
// ===============================
async function main() {
  try {
    // Abre a conexão com o banco
    await client.connect();
    console.log('🔌 Conectado ao banco de dados');

    // Inicia o menu
    await menu();
  } catch (erro) {
    console.error('❌ Erro geral:', erro.message);
  } finally {
    // Fecha a conexão corretamente
    await client.end();
    console.log('🔒 Conexão encerrada');
  }
}

// Executa o programa
main();