# Comandos do Projeto


**Criar Migration**

- yarn typeorm-createMigration ./src/shared/infra/typeorm/migrations/<Nome_Da_Migration>

**Rodar Migrations**

- yarn typeorm-runMigration

**Reverter Última Migration**
- yarn typeorm-revertMigration"

# Requisitos do projeto

**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** => Regras de negócio

# Cadastro de Carro

**RF**

- Deve ser possível cadastrar um novo carro.

**RN**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade por padrão.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de Carros

**RF**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

- O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no Carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro.

**RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de Imagens do Carro

**RF**

- Deve ser possível cadastrar a imagem do carro.

**RNF**

- Utilizar o multer para upload dos arquivos.

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de Carro

**RF**

- Deve ser possível cadastrar um aluguel

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- o usuário deve estar loagdo na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.


# Devolução de carro

**RF**

- Deve ser possível realizar a devolução de um carro.

**RN**

- Se o carro for devolvido com menos de 24hrs, deverá ser cobrado a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, devera ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.

# Listagem de Alugueis para usuários

**RF**

- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**

- O usuário deve estar logado na aplicação.
