import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("App Tests", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("header must be rendered", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  });

  test("Emoji list should be rendered successfully", () => {
    const items = screen.getAllByText("Click to copy emoji");
    expect(items.length).toEqual(20);
  });

  test("Filtering should work", () => {
    const emoji = "Snowflake";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: emoji } });

    expect(screen.getByText(emoji)).toBeInTheDocument();
  });

  test("Copying should work", () => {
    const click = screen.getAllByText("Click to copy emoji").at(0);
    const parent = click.parentElement;
    expect(parent.getAttribute("data-clipboard-text").length).toBeGreaterThan(
      0
    );
  });
});