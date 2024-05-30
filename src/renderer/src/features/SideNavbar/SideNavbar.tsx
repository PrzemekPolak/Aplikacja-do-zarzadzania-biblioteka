import { StyledLink, StyledNavbar, StyledNavTitle } from "./SideNavbar.style";
import { INavButtons } from "./SideNavbar.model";

const SideNavbar = () => {
  const navButtons: Array<INavButtons> = [
    { path: "/usersList", label: "Lista użytkowników" },
    { path: "/booksList", label: "Lista książek" },
    { path: "/borrowedList", label: "Lista wypożyczeń" },
    { path: "/addUser", label: "Dodaj użytkownika" },
    { path: "/addBook", label: "Dodaj książkę" },
    { path: "/addBorrowed", label: "Dodaj wypożyczenie" },
    { path: "/admin", label: "Administarcja" },
  ];
  return (
    <StyledNavbar>
      <StyledNavTitle>Nawigacja</StyledNavTitle>
      {navButtons.map((el: INavButtons) => (
        <StyledLink to={el.path} key={el.path}>
          {el.label}
        </StyledLink>
      ))}
    </StyledNavbar>
  );
};

export { SideNavbar };
