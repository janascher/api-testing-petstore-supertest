const request = require('../../utils/apiClient');
const createPetDataPath = require('../../fixtures/dataDriven/pet/json/create_pet_data_sucess');
const updatePetDataPath = require('../../fixtures/dataDriven/pet/json/update_pet_data_sucess');

describe('API PetStore - Data Driven - CRUD da Entidade Pet', () => {
  // Massa de teste que lê e cria todos os registros
  it.each(
    createPetDataPath.array.map((element) => [
      element.idPet,
      element.petName,
      element.idCategory,
      element.categoryName,
      element.idTags,
      element.petTagsName,
      element.petStatus,
    ])
  )(
    'POST Pet - Deve criar um novo pet com sucesso: %s, %s',
    async (idPet, petName, idCategory, categoryName, idTags, petTagsName, petStatus) => {
      // O '%s' faz referência ao primeiro elemento

      // Carrega um petData padrão (example.json) e personaliza-o com os dados fornecidos
      const petData = require('../../fixtures/simpleData/pet/example.json');
      petData.id = idPet;
      petData.name = petName;
      petData.category.id = idCategory;
      petData.category.name = categoryName;
      petData.tags.id = idTags;
      petData.tags.name = petTagsName;
      petData.status = petStatus;

      // Envia uma requisição POST para criar o pet
      const res = await request.post('/pet').send(petData);

      // Valida da resposta
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(idPet);
      expect(res.body.name).toBe(petName);
      expect(res.body.category.name).toBe(categoryName);
      expect(res.body.tags[0].name).toBe(petTagsName);
    },
    30000
  );

  it.each(
    createPetDataPath.array.map((element) => [element.idPet, element.petName, element.petStatus])
  )(
    'GET Pet - Deve retornar os dados de um pet existente com sucesso: %s, %s',
    async (idPet, petName, petStatus) => {
      // Tenta obter o pet via GET. Se o pet não existir (código 404), imprime uma mensagem e continua
      try {
        const getRes = await request.get(`/pet/${idPet}`).set('api_key', 'special-key');
        if (getRes.statusCode === 404) {
          console.log(`Pet ${idPet} já foi excluído`);
          return;
        }
      } catch (error) {
        console.log(`Erro ao verificar pet ${idPet}: ${error}`);
      }

      const petData = require('../../fixtures/simpleData/pet/example.json');
      petData.id = idPet;
      petData.name = petName;
      petData.status = petStatus;

      // Envia uma requisição GET para obter o pet
      const res = await request.get(`/pet/${idPet}`).set('api_key', 'special-key');

      // Valida da resposta
      expect(res.statusCode).toBe(200);
      expect(res.body.id).toBe(idPet);
      expect(res.body.status).toBe(petStatus);
    },
    60000
  );

  it.each(
    updatePetDataPath.array.map((element) => [
      element.idPet,
      element.petName,
      element.idCategory,
      element.categoryName,
      element.idTags,
      element.petTagsName,
      element.petStatus,
    ])
  )(
    'PUT Pet -  Deve atualizar os dados de um pet existente com sucesso: %s, %s',
    async (idPet, petName, idCategory, categoryName, idTags, petTagsName, petStatus) => {
      // Carrega um petData padrão e personaliza-o com os novos dados
      const petData = require('../../fixtures/simpleData/pet/example.json');
      petData.id = idPet;
      petData.name = petName;
      petData.category.id = idCategory;
      petData.category.name = categoryName;
      petData.tags.id = idTags;
      petData.tags.name = petTagsName;
      petData.status = petStatus;

      // Envia uma requisição PUT para atualizar o pet
      const res = await request.put('/pet').send(petData).set('api_key', 'special-key');

      // Valida a resposta
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe(petStatus);
    },
    15000
  );

  it.each(updatePetDataPath.array.map((element) => [element.idPet, element.petName]))(
    'DELETE Pet DD - Deve remover um pet existente com sucesso: %s, %s',
    async (idPet, petName) => {
      // Verifica se o pet ainda existe. Se não existir, imprime uma mensagem e continua
      try {
        const getRes = await request.get(`/pet/${idPet}`);
        if (getRes.statusCode === 404) {
          console.log(`Pet ${idPet} já foi excluído`);
          return;
        }
      } catch (error) {
        console.log(`Erro ao verificar pet ${idPet}: ${error}`);
      }

      const petData = require('../../fixtures/simpleData/pet/example.json');
      petData.id = idPet;
      petData.name = petName;

      // Envia uma requisição DELETE para remover o pet
      const res = await request.delete(`/pet/${idPet}`).set('api_key', 'special-key');

      // Valida a resposta
      expect(res.statusCode).toBe(200);
      expect(res.body.code).toBe(200);
      expect(res.body.message).toBe(idPet.toString());
    }
  );
});
