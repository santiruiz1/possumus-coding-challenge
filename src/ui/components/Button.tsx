type Props = {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

function Button({ title, onClick, className, type = 'button' }: Props) {
  return <button type={type} className={"transition-all p-4 rounded-lg border-text border-2 shadow-md " + (className ? className : "")} onClick={onClick}>{title}</button>;
}

export default Button;
