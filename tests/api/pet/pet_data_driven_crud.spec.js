const supertest = require('supertest');
const massaPetDataDriven = require('../../testData/json/create_pet_data_sucess');

describe('API PetStore Swagger - Entidade Pet', () => {
  const request = supertest('https://petstore.swagger.io/v2');

  // Testes Data Driven do CRUD (POST, GET, PUT e DELETE)
  // Utilizando o método `forEach` para iterar sobre cada elemento do array `massaPetDataDriven.array`
  massaPetDataDriven.array.forEach(({ petName, idPet, categoryName, idCategory }) => {
    it(`POST Pet DD forEach - ${petName}`, async () => {
      const payloadCreatePet = require('../../vendors/json/cadastrar_pet_sucesso.json');

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

    it(`GET Pet DD forEach - ${petName}`, async () => {
      const res = await request.get(`/pet/${idPet}`);

      expect(200).toBe(res.statusCode);
      expect(idPet).toBe(res.body.id);
      expect('available').toBe(res.body.status);
    });

    it(`PUT Pet DD forEach - ${petName}`, async () => {
      const payloadUpdatePet = require('../../vendors/json/atualizar_pet_sucesso.json');

      // payloadUpdatePet.id = idPet;
      payloadUpdatePet.name = petName;
      payloadUpdatePet.category.id = idCategory;
      payloadUpdatePet.category.name = categoryName;

      const res = await request.put('/pet').send(payloadUpdatePet);

      expect(200).toEqual(res.statusCode);
      expect('sold').toBe(res.body.status);
    });

    it(`DELETE Pet DD forEach - ${petName}`, async () => {
      const res = await request.delete(`/pet/${idPet}`);

      expect(200).toBe(res.statusCode);
      expect(200).toBe(res.body.code);
      expect(idPet.toString()).toBe(res.body.message);
    });
  });
});
