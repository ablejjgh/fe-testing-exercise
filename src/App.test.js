import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
test("logs in user", async () => {
  render(<App />);
  const emailTextBox = screen.getByLabelText("Email");
  const pwdTextBox = screen.getByLabelText("Password");
  const submitButton = screen.getByText("Submit");

  userEvent.type(emailTextBox, "jj@able.co");
  userEvent.type(pwdTextBox, "123456");
  userEvent.click(submitButton);

  await screen.findByText(/you are logged in/i);
});

test("logs out user", async () => {
  render(<App />);
  const emailTextBox = screen.getByLabelText("Email");
  const pwdTextBox = screen.getByLabelText("Password");
  const submitButton = screen.getByText("Submit");

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
