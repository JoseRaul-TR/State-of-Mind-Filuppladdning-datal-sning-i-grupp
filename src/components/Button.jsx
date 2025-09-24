export default function Button({ buttonText, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
    >
      {buttonText}
    </button>
  );
}
