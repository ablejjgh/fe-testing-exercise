import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
test("logs in user", async () => {
  render(<App />);
  const emailTextBox = screen.getByRole("textbox", { name: /email/i });
  const pwdTextBox = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  expect(submitButton).toBeDisabled();

  userEvent.type(emailTextBox, "jj@able.co");
  userEvent.type(pwdTextBox, "123456");
  userEvent.click(submitButton);

  expect(submitButton).not.toBeDisabled();

  const loggedInText = await screen.findByText(/you are logged in/i);
  expect(loggedInText).toBeInTheDocument();
});

test("logs out user", async () => {
  render(<App />);
  const emailTextBox = screen.getByRole("textbox", { name: /email/i });
  const pwdTextBox = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(emailTextBox, "jj@able.co");
  userEvent.type(pwdTextBox, "123456");
  userEvent.click(submitButton);

  const msg = await screen.findByText(/you are logged in/i);
  const logOutButton = screen.getByText(/log out/i);

  userEvent.click(logOutButton);

  const loginTitle = screen.getByText("Log Into My Account");

  expect(msg).not.toBeInTheDocument();
  expect(loginTitle).toBeInTheDocument();
});
