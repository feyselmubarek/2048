import clsx from "clsx";

const background = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const BoardBackground = () => {
  return background.map((num) => (
    <div
      key={num}
      className={clsx(
        "bg-white/5 rounded-md text-6xl m-2",
        "flex justify-center items-center"
      )}
    />
  ));
};

export default BoardBackground;
