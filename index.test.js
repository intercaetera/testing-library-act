import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useFormik } from "formik";
import React from 'react';

const noop = () => {};

const Foo = () => {
  const formik = useFormik({
    initialValues: { foo: "bar" },
    validate: noop,
    validateOnMount: true,
  });

  return (
    <input
      value={formik.values.foo}
      onChange={(e) => formik.setFieldValue("foo", e.target.value)}
      placeholder="foobar"
    />
  );
};

describe("error", () => {
  test("produces the act warning", () => {
    render(<Foo />);

    fireEvent.change(screen.getByPlaceholderText("foobar"), {
      target: { value: "hello" }
    });

    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });
});
