import { render, screen, fireEvent } from "@testing-library/react";
import { MenuButton } from "./MenuButton";
import "@testing-library/jest-dom";

jest.mock("../icon/Icon", () => ({
  Icon: ({ name }: { name: string }) => (
    <span data-testid={`icon-${name}`}></span>
  ),
}));

describe("MenuButton Component", () => {
  const mockMenuItems = [
    { label: "Profile", onClick: jest.fn(), iconName: "user" },
    { label: "Settings", onClick: jest.fn(), iconName: "settings" },
    { label: "Logout", onClick: jest.fn(), iconName: "logout" },
  ];

  const renderComponent = (props = {}) => {
    const defaultProps = {
      label: "Menu",
      menuItems: mockMenuItems,
      position: "top-right" as const,
      icon: { name: "menu-icon", classNames: "h-4 w-4" },
      iconOnly: false,
      ...props,
    };
    return render(<MenuButton {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 10,
      right: 500,
      bottom: 60,
      left: 400,
      x: 400,
      y: 10,
      toJSON: () => {},
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders with label and icon", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /menu/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("icon-menu-icon")).toBeInTheDocument();
    expect(button).toHaveTextContent("Menu");
  });

  it("renders icon only when iconOnly is true", () => {
    renderComponent({ iconOnly: true });

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveTextContent("Menu");
    expect(screen.getByTestId("icon-menu-icon")).toBeInTheDocument();
  });

  it("toggles the dropdown menu on button click", async () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /menu/i });

    expect(screen.queryByTestId("content")).not.toBeInTheDocument();

    fireEvent.click(button);
    const dropdown = await screen.findByTestId("content");
    expect(dropdown).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });
});