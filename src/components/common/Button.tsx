/* -------------------------------------------------------------------------- */
/*                         Стандартная кнопка проекта                         */
/* -------------------------------------------------------------------------- */

interface ButtonProps extends React.ComponentProps<"button"> {
  /** Длительность анимации при наведении */
  hoverDuration?: number;
}

/* -------------------------------------------------------------------------- */

const Button: React.FC<ButtonProps> = ({ hoverDuration = 300, children }) => {
  return (
    <button
      className={"bg-accent--secondary-hot py-1 px-5 text-main relative group"}
    >
      <span className="relative z-10">{children}</span>
      {/* блок с анимацией при наведении */}
      <span
        className="absolute inset-0 
               absolute bg-content--primary 
               scale-x-0 origin-center
               transition-all
               group-hover:scale-x-100"
        style={{ transitionDuration: `${hoverDuration}ms` }}
      ></span>
    </button>
  );
};

export default Button;
