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
      className={`flex items-center justify-center rounded cursor-pointer bg-indigo-600 px-4 py-2 text-white transition-all hover:bg-indigo-700 hover:scale-105 ${className || ''}`}
    >
      {content}
    </button>
  );
}
