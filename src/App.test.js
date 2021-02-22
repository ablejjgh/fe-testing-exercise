import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("logs in user", async () => {
  const { getByRole, getByLabelText, findByText } = render(<App />);
  const emailTextBox = getByRole("textbox", { name: /email/i });
  const pwdTextBox = getByLabelText(/password/i);
  const submitButton = getByRole("button", { name: /submit/i });

  expect(submitButton).toBeDisabled();

  userEvent.type(emailTextBox, "jj@able.co");
  userEvent.type(pwdTextBox, "123456");
  userEvent.click(submitButton);

  expect(submitButton).not.toBeDisabled();

  const loggedInText = await findByText(/you are logged in/i);
  expect(loggedInText).toBeInTheDocument();
});

test("logs out user", async () => {
  const { findByText, getByText, getByRole, getByLabelText } = render(<App />);
  const emailTextBox = getByRole("textbox", { name: /email/i });
  const pwdTextBox = getByLabelText(/password/i);
  const submitButton = getByRole("button", { name: /submit/i });

  userEvent.type(emailTextBox, "jj@able.co");
  userEvent.type(pwdTextBox, "123456");
  userEvent.click(submitButton);

  const msg = await findByText(/you are logged in/i);
  const logOutButton = getByText(/log out/i);

  userEvent.click(logOutButton);

  const loginTitle = getByText("Log Into My Account");

  expect(msg).not.toBeInTheDocument();
  expect(loginTitle).toBeInTheDocument();
});
