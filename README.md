## 🍽️ MS Registros de Refeições

## Microserviço responsável por registrar refeições realizadas pelos usuários em diferentes turnos do dia (manhã, tarde e noite). Ele controla o histórico de refeições por usuário, contabiliza refeições por data e garante regras de funcionamento conforme os horários definidos.



### 🚀 Tecnologias Utilizadas

Node.js com Express

Prisma ORM (PostgreSQL)

Axios (validação de token em outro serviço)

JWT (validação de autenticação via serviço externo)

Ngrok (exposição do serviço de autenticação externo)



### 📂 Estrutura do Projeto
src/

 controllers/       # Camada de controle (requisições/respostas)
 
 middlewares/       # Middleware de autenticação
 
 repository/        # Acesso ao banco via Prisma
 
 services/          # Regras de negócio
 
 routes/            # Definição das rotas
 
 prisma/            # Schema do banco de dados

### ⚙️ Configuração do Ambiente
#### 1. Clonar o repositório
git clone https://github.com/CodeWave-Innovations-Group-CWI-Group/ms-registros-de-refeicoes.git
cd ms-registros-de-refeicoes

#### 2. Instalar dependências
npm install

#### 3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

#### 4. Executar as migrations
npx prisma migrate dev

#### 5. Rodar o projeto
node server



### 🗄️ Banco de Dados
Modelo Meal

Definição em schema.prisma:

model Meal {
  id        String   @id @default(cuid())
  userId    String
  menuId    String
  date      String
  shift     String

  @@unique([userId, date, shift])
}


Cada refeição é única por usuário + data + turno (não é possível registrar duas refeições iguais no mesmo período).



### 🔑 Autenticação

Todas as rotas utilizam um middleware de autenticação (authMiddleware).
Ele valida o token JWT via uma API externa:

GET /api/v1/auth/validate-token/

GET /api/v1/profile/me/

Se o token for válido, as informações do usuário são anexadas em req.user.



### 📌 Rotas Disponíveis

#### ➕ Criar refeição

POST /meals/create

Corpo da requisição:

{
  "userId": "123",
  "menuId": "456"
}


Regras de horário:

Manhã → 06:00 até 11:59

Tarde → 12:00 até 17:59

Noite → 18:00 até 23:59

Fora desses horários, a API retorna erro.

Resposta de sucesso (201):

{
  "createMeal": {
    "id": "cuid",
    "userId": "123",
    "menuId": "456",
    "date": "2025-10-01",
    "shift": "manhã"
  }
}



#### 📜 Histórico de refeições de um usuário

GET /meals/user/meals/history/:userId

Exemplo:

/meals/user/meals/history/123


Resposta:

{
  "mealsUser": [
    {
      "id": "cuid",
      "userId": "123",
      "menuId": "456",
      "date": "2025-10-01",
      "shift": "manhã"
    }
  ]
}



#### 📊 Refeições de um dia

GET /meals/day/:day

Exemplo:

/meals/day/2025-10-01


Resposta:

{
  "mealsDay": {
    "historyMelsDay": [
      {
        "id": "cuid",
        "userId": "123",
        "menuId": "456",
        "date": "2025-10-01",
        "shift": "manhã"
      }
    ],
    "numberMealsDay": 1
  }
}



### 🛡️ Regras de Negócio

Cada usuário pode registrar apenas uma refeição por turno do dia.

Não é possível registrar refeições fora do horário de funcionamento:

Permitido: 06:00 → 23:59

Negado: 00:00 → 05:59

A autenticação é obrigatória via token JWT.




