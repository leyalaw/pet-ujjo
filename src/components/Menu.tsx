import React from "react";

/* -------------------------------------------------------------------------- */
/*                                    Меню                                    */
/* -------------------------------------------------------------------------- */

interface MenuProps extends React.ComponentProps<"ul"> {
  items: Record<Id, MenuItem>;
}

type Id = string;

type MenuItemLink = {
  href: string;
  title: string;
  text: React.ReactNode;
};

type MenuItem = MenuItemLink | React.ReactElement;

/* -------------------------------------------------------------------------- */

const Menu: React.FC<MenuProps> = ({ items }) => {
  const isMenuItemLink = (item: MenuItem): item is MenuItemLink =>
    ["href", "title", "text"].every((key) => key in item);

  return (
    <ul className="w-full flex lg:flex flex-col lg:flex-row lg:gap-default">
      {Object.entries(items).map(([id, item]) => (
        <li key={id} className="flex-[1_1_0] flex justify-center items-center">
          {/* если ссылка */}
          {isMenuItemLink(item) ? (
            <a href={item.href} title={item.title} className="p-default">
              {item.text}
            </a>
          ) : (
            // если элемент
            React.cloneElement(item)
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
