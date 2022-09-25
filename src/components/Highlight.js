const Highlight = ({ title, body }) => {
  return (
    <div className="self-stretch bg-white flex flex-col p-[12px] box-border items-start justify-start gap-[8px] text-left text-base text-gray-700 font-inter">
      <div className="self-stretch relative leading-[16px] font-medium inline-block">
        {title}
      </div>
      <div className="self-stretch relative leading-[16px] text-gray-500 inline-block">
        {body}
      </div>
    </div>
  );
};

export default Highlight;
