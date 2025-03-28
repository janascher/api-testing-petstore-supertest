const request = require('../../utils/apiClient');

describe('API PetStore - CRUD da Entidade Pet', () => {
  let petId;

  it('POST Pet - Deve criar um novo pet com sucesso', async () => {
    const payloadCreatePet = require('../../fixtures/simpleData/pet/create_pet_sucess.json');

    const res = await request.post('/pet').send(payloadCreatePet);
    petId = res.body.id; // Atribui o ID à variável global

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(petId);
    expect(res.body.name).toBe('Snoopy');
    expect(res.body.category.name).toBe('dog');
    expect(res.body.tags[0].name).toBe('vaccined');
  }, 15000);

  it('GET Pet - Deve retornar os dados de um pet existente com sucesso', async () => {
    const res = await request.get(`/pet/${petId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(petId);
    expect(res.body.status).toBe('available');
  });

  it('PUT Pet - Deve atualizar os dados de um pet existente com sucesso', async () => {
    const payloadUpdatePet = require('../../fixtures/simpleData/pet/update_pet_data_sucess.json');
    const res = await request.put('/pet').send(payloadUpdatePet);

    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('sold');
  });

  it('DELETE Pet - Deve remover um pet existente com sucesso', async () => {
    const res = await request.delete(`/pet/${petId}`);

    expect(res.status).toBe(200);
    expect(res.body.code).toBe(200);
    expect(res.body.message).toBe(petId.toString());
  });
});
