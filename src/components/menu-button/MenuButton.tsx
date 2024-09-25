import { useState, useRef, useEffect } from "react";
import { Icon } from "../icon/Icon";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type MenuItem = { label: string; onClick: () => void; iconName?: string };
type MenuButtonProps = {
  label: string;
  position?: Position;
  menuItems: MenuItem[];
  icon?: { name: string; classNames?: string };
  iconOnly?: boolean;
  className?: string;
};

const replacePosition = (
  position: string,
  primary: string,
  secondary: string
): Position => {
  return position.includes(primary)
    ? (position.replace(primary, secondary) as Position)
    : (position.replace(secondary, primary) as Position);
};

const MenuButton = ({
  label,
  menuItems,
  position = "top-right",
  icon,
  iconOnly,
  className,
}: MenuButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState(position);
  const [isPositioned, setIsPositioned] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Reset dropdownPosition to initial when menu is closed
  useEffect(() => {
    if (!isOpen) {
      setDropdownPosition(position);
      setIsPositioned(false);
    }
  }, [isOpen, position]);

  // Adjust positioning based on available space
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let adjustedPosition = position;

      // Adjust position based on available space to the right and left
      if (rect.right > screenWidth) {
        adjustedPosition = replacePosition(adjustedPosition, "left", "right");
      }
      if (rect.left < 0) {
        adjustedPosition = replacePosition(adjustedPosition, "right", "left");
      }

      // Adjust position based on available space at the bottom and top
      if (rect.bottom > screenHeight) {
        adjustedPosition = replacePosition(adjustedPosition, "top", "bottom");
      }
      if (rect.top < 0) {
        adjustedPosition = replacePosition(adjustedPosition, "bottom", "top");
      }

      // Update the dropdown position and mark as positioned
      setDropdownPosition(adjustedPosition);
      setIsPositioned(true);
    }
  }, [isOpen, position]);

  // Close popup when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getDropdownPositionClasses = () => {
    switch (dropdownPosition) {
      case "top-right":
        return "origin-top-right right-0 mt-2";
      case "top-left":
        return "origin-top-left left-0 mt-2";
      case "bottom-right":
        return "origin-bottom-right right-0 mb-2";
      case "bottom-left":
        return "origin-bottom-left left-0 mb-2";
      default:
        return "origin-top-right right-0 mt-2";
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        title={label}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          iconOnly
            ? "p-2 hover:bg-off-white dark:hover:bg-gray-800 rounded-full"
            : "px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded"
        }`}
      >
        <div className="flex items-center gap-1">
          {icon && (
            <Icon
              name={icon.name}
              classNames={`${icon.classNames || "h-4 w-4"}`}
            />
          )}
          {!iconOnly && label}
        </div>
      </button>

      {isOpen && (
        <div data-testid="content" 
          ref={menuRef}
          className={`absolute z-50 w-48 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg ring-1
             ring-black ring-opacity-5 transition-opacity duration-150
             ${getDropdownPositionClasses()} ${
            isPositioned ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => (setIsOpen(false), item.onClick())}
              className="block rounded px-4 py-2 text-sm hover:bg-off-white dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-1">
                {item.iconName && (
                  <Icon name={item.iconName} classNames="w-4 h-4" />
                )}
                {item.label}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export { MenuButton };
