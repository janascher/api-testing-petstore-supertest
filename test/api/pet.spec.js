const supertest = require('supertest');

const petId = 373218;

describe('API PetStore Swagger - Entidade Pet', () => {
  const request = supertest('https://petstore.swagger.io/v2'); // BaseURL

  it('POST Pet', async () => {
    const payloadCreatePet = require('../../vendors/json/cadastrar_pet_sucesso.json');

    const res = await request.post('/pet').send(payloadCreatePet);

    // Funções de teste em si
    // O expect segue o padrão da documentação do Jest (`expect(received).toBe(expected)`), em vez da abordagem mencionada pelo professor (`expect(expected).toBe(received)`).
    expect(200).toBe(res.statusCode);
    expect(petId).toBe(res.body.id);
    expect('Snoopy').toBe(res.body.name);
    expect('dog').toBe(res.body.category.name);
    expect('vaccined').toBe(res.body.tags[0].name);
  });

  it('GET Pet', async () => {
    const res = await request.get(`/pet/${petId}`);

    // O expect segue o padrão da documentação do Jest (`expect(received).toBe(expected)`), em vez da abordagem mencionada pelo professor (`expect(expected).toBe(received)`).
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

// NOTAS:
// Durante a aula, o professor demonstrou o uso de `then()` para lidar com as requisições assíncronas nos testes. No entanto, ao implementar os testes, optei por utilizar `async` e `await`. Essa escolha foi motivada pela necessidade de resolver problemas que surgiram nos testes, como a obtenção de valores indefinidos, além de melhorar a legibilidade do código.
//Além disso, acredito que `async` e `await` tornam o fluxo do código mais intuitivo e garantem que cada chamada assíncrona seja devidamente aguardada antes de proceder com as validações. Essa abordagem está alinhada às práticas de desenvolvimento em JavaScript, oferecendo maior confiabilidade e clareza na execução dos testes.
