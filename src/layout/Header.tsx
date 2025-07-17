import GridCell from "@components/Grid/GridCell";
import Menu from "@components/Menu";
import Button from "@commonComponents/Button";
import HomeLogo from "@components/HomeLogo";

/* -------------------------------------------------------------------------- */
/*                                    Хедер                                   */
/* -------------------------------------------------------------------------- */

const Header = () => {
  const menuItems = {
    back: <Button>Go back</Button>,
    about: {
      href: "#",
      title: "About us",
      text: "Story",
    },
    shop: {
      href: "#",
      title: "Our shop",
      text: "Shop",
    },
    home: <HomeLogo />,
    contact: {
      href: "#",
      title: "Contact us",
      text: "Contact",
    },
    wholesale: {
      href: "#",
      title: "Wholesale",
      text: "Wholesale",
    },
    clone: <Button>Clone</Button>,
  };

  return (
    <GridCell
      tag={"header"}
      className="text-content--secondary text-[1.4rem]/[2.16]"
    >
      <Menu items={menuItems} />
    </GridCell>
  );
};

export default Header;
