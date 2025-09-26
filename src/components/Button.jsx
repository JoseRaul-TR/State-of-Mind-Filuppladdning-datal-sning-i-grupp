export default function Button({ buttonText, clickHandler, children }) {
  // SDetermine content: render children if provided, otherwise render buttonText
  const content = children ? children : buttonText;
  return (
    <button
      onClick={clickHandler}
      className="rounded bg-indigo-600 px-4 py-2 text-white transition cursor-pointer hover:bg-indigo-700 hover:scale-105"
    >
      {content}
    </button>
  );
}
