import vueImport from '../src';

document.innerHTML = `
  <html>
    <head></head>
    <body></body>
  </html>
`;

const mockModule = {
  data: () => ({ user: 'kian' }),
  beforeMount: jest.fn(),
  beforeUnmount: jest.fn(),
};

jest.mock("blob:url", () => mockModule, { virtual: true });

describe('vue-import', () => {
  afterEach(() => {
    fetch.mockClear();
    URL.createObjectURL.mockClear();
    mockModule.beforeMount.mockClear();
    mockModule.beforeUnmount.mockClear();
  });

  test('The fetch and createObjectURL method should be called', async () => {
    await vueImport("test.vue");

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith("test.vue");
    expect(URL.createObjectURL).toBeCalledTimes(1);
    expect(URL.createObjectURL.mock.calls[0][0]).toBeInstanceOf(Blob);
  });

  test(`The imported component data.user should be ${mockModule.data().user}`, async () => {
    const component = await vueImport("test.vue");

    expect(component.data().user).toBe(mockModule.data().user);
  });

  test(`The style tag should be mounted and unmounted`, async () => {
    const component = await vueImport("test.vue");

    expect(document.querySelectorAll('style').length).toBe(0);

    component.beforeMount(); // trigger mount
    expect(document.querySelectorAll('style').length).toBe(2);
    expect(mockModule.beforeMount).toBeCalledTimes(1);

    component.beforeUnmount(); // trigger unmount
    expect(document.querySelectorAll('style').length).toBe(0);
  });

  test(`The component beforeMount and beforeUnmount should be order called`, async () => {
    const beforeMount = jest.fn();
    const beforeUnmount = jest.fn();
    const component = await vueImport("test.vue", {
      beforeMount,
      beforeUnmount,
    });

    component.beforeMount(); // trigger mount
    expect(mockModule.beforeMount).toBeCalledTimes(1);
    expect(beforeMount).toBeCalled();
    expect(mockModule.beforeMount.mock.invocationCallOrder[0]).toBeLessThan(beforeMount.mock.invocationCallOrder[0]);

    component.beforeUnmount(); // trigger unmount
    expect(mockModule.beforeUnmount).toBeCalledTimes(1);
    expect(beforeUnmount).toBeCalled();
    expect(mockModule.beforeUnmount.mock.invocationCallOrder[0]).toBeLessThan(beforeUnmount.mock.invocationCallOrder[0]);

  });
});
