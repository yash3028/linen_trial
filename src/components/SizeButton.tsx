import "../styles/SizeButton.css";

export const SizeButton = (props: {
  label: string;
  index: number;
  isSelectedArray: boolean[];
  onClick: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) => {
  return (
    <>
      <button
        className={`hover:bg-primary hover:text-secondary rounded-xs border min-w-20 ${
          props.isSelectedArray[props.index]
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary"
        }`}
        style={{ padding: "1%", cursor: "pointer" }}
        onClick={(event) => props.onClick(props.index, event)}
      >
        {props.label}
      </button>
    </>
  );
};
