const supertest = require('supertest');
const massaPetDataDriven = require('../../testData/json/create_pet_data_sucess');

const petId = 373218;

describe('API PetStore Swagger - Entidade Pet', () => {
  const request = supertest('https://petstore.swagger.io/v2');

  // Massa de teste que lê e cria todos os registros
  it.each(
    massaPetDataDriven.array.map((element) => [
      element.petName,
      element.idPet,
      element.categoryName,
      element.idCategory,
    ])
  )('POST Pet DD: %s', async (petName, idPet, categoryName, idCategory) => {
    // O '%s' faz referência ao primeiro elemento
    const payloadCreatePet = require('../../vendors/json/cadastrar_pet_sucesso.json');

    // // Personalização dos campos da entidade 'pet' utilizando os dados fornecidos na massa de teste.
    // Isso permite realizar testes dinâmicos e reutilizáveis, ajustando as informações de acordo com os diferentes cenários definidos nos dados de entrada.
    payloadCreatePet.id = idPet;
    payloadCreatePet.name = petName;
    payloadCreatePet.category.id = idCategory;
    payloadCreatePet.category.name = categoryName;

    const res = await request.post('/pet').send(payloadCreatePet);

    expect(200).toBe(res.statusCode);
    expect(idPet).toBe(res.body.id);
    expect(petName).toBe(res.body.name);
    expect(categoryName).toBe(res.body.category.name);
    expect('vaccined').toBe(res.body.tags[0].name);
  });

  it('GET Pet', async () => {
    const res = await request.get(`/pet/${petId}`);

    expect(200).toBe(res.statusCode);
    expect(petId).toBe(res.body.id);
    expect('available').toBe(res.body.status);
  });

  it('PUT Pet', async () => {
    const payloadUpdatePet = require('../../vendors/json/atualizar_pet_sucesso.json');

    const res = await request.put('/pet').send(payloadUpdatePet);

    expect(200).toEqual(res.statusCode);
    expect('sold').toEqual(res.body.status);
  });

  it('DELETE Pet', async () => {
    const res = await request.delete(`/pet/${petId}`);

    expect(200).toBe(res.statusCode);
    expect(200).toBe(res.body.code);
    expect(petId.toString()).toBe(res.body.message);
  });
});

