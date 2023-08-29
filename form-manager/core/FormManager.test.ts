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

  test("handle submit works correct", () => {
    const handleSubmit = jest.fn();
    const onSumbit = formManager.handleSubmit(handleSubmit);

    onSumbit();

    expect(handleSubmit).toHaveBeenCalledWith({
      email: "example@mail.com",
      password: "qwerty",
      age: 22,
      role: { name: "guest" },
    });
  });

  test("validate works correctly", () => {
    formManager.validate((values) => {
      return {
        values: {},
        errors: {
          email: { message: "Email is not valid" },
        },
      };
    });

    expect(formManager.errors$.getValue()).toStrictEqual({
      email: { message: "Email is not valid" },
    });
  });
});
