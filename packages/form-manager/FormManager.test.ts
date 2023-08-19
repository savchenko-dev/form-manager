import { FormManager } from "./FormManger";

describe("FormManager", () => {
  const formManager = new FormManager({
    values: {
      email: "example@mail.com",
      password: "qwerty",
      age: 18,
      role: { name: "admin" },
    },
  });
  test("default values sets correct", () => {
    expect(formManager.getValues()).toStrictEqual({
      email: "example@mail.com",
      password: "qwerty",
      age: 18,
      role: { name: "admin" },
    });
  });

  test("update top level field", () => {
    formManager.setValue("age", 22);

    expect(formManager.getValues()).toStrictEqual({
      email: "example@mail.com",
      password: "qwerty",
      age: 22,
      role: { name: "admin" },
    });
  });
  test("update nested level field", () => {
    formManager.setValue("role.name", "guest");

    expect(formManager.getValues()).toStrictEqual({
      email: "example@mail.com",
      password: "qwerty",
      age: 22,
      role: { name: "guest" },
    });
  });
});
