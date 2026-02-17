const TextArea = () => {
  return (
    <div className="flex justify-center items-center w-full lg:w-1/2 mx-auto">
      <textarea
        rows={3}
        className="w-full border-1 focus:border-2 rounded-xl p-2"
        style={{ outline: "none" }}
      ></textarea>
    </div>
  );
};

export default TextArea;
