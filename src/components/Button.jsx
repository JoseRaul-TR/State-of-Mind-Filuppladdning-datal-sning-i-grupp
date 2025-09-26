export default function Button({
  buttonText,
  clickHandler,
  children,
  className,
}) {
  // SDetermine content: render children if provided, otherwise render buttonText
  const content = children ? children : buttonText;
  return (
    <button
      onClick={clickHandler}
      // Combine the default styles with any passed-in className
      className={`cursor-pointer rounded bg-indigo-600 px-4 py-2 text-white transition hover:scale-105 hover:bg-indigo-700 ${className || ""}`}
    >
      {content}
    </button>
  );
}
