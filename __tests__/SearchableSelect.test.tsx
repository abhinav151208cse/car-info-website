import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchableSelect from "@/components/SearchableSelect";

afterEach(() => cleanup());

const options = [
  { id: "a", label: "Seltos HTX · Petrol · IVT — ₹16 Lakh", keywords: "HTX IVT" },
  { id: "b", label: "Seltos HTX · Petrol · DCT — ₹17 Lakh", keywords: "HTX DCT" },
  { id: "c", label: "Seltos GTX · Diesel · AT — ₹18 Lakh", keywords: "GTX Diesel" },
];

describe("SearchableSelect", () => {
  it("renders selected label on trigger", () => {
    render(
      <SearchableSelect
        id="variant-a"
        label="Pick variant"
        value="a"
        onChange={vi.fn()}
        options={options}
      />
    );
    expect(screen.getByRole("button", { name: "Pick variant" })).toHaveTextContent(
      /IVT/
    );
  });

  it("filters options when searching", async () => {
    const user = userEvent.setup();
    render(
      <SearchableSelect
        id="variant-b"
        label="Pick variant"
        value=""
        onChange={vi.fn()}
        options={options}
        emptyOption={{ id: "", label: "Select variant" }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Pick variant" }));
    const listbox = screen.getByRole("listbox");
    const search = within(listbox.parentElement!).getByRole("searchbox");
    await user.type(search, "DCT");

    expect(within(listbox).getByText(/DCT/)).toBeInTheDocument();
    expect(within(listbox).queryByText(/GTX/)).not.toBeInTheDocument();
  });

  it("calls onChange when option picked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SearchableSelect
        id="variant-c"
        label="Pick variant"
        value=""
        onChange={onChange}
        options={options}
      />
    );

    await user.click(screen.getByRole("button", { name: "Pick variant" }));
    await user.click(
      screen.getByText("Seltos HTX · Petrol · DCT — ₹17 Lakh")
    );
    expect(onChange).toHaveBeenCalledWith("b");
  });
});
