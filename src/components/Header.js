const Header = ({reader,high}) => {
  return (
    <div className="self-stretch rounded-[8px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-2px_rgba(0,_0,_0,_0.05)] h-[54px] shrink-0 overflow-hidden flex flex-row p-[8px_16px_8px_22px] box-border items-center justify-start gap-[16px] text-left text-lg text-gray-500 font-inter">
      <b className="flex-[1] relative leading-[20px] inline-block">Book Name</b>
      <div className="flex flex-row items-center justify-center gap-[16px]">
        <div className="flex flex-row items-start justify-start">
          <button onClick={reader.prevPage} className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-gray-100 rounded-[4px_0px_0px_4px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsarrowbackios.svg"
            />
          </button>
          <button className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-white box-border relative h-[38px] flex flex-row items-center justify-center">
            <div className="relative text-sm leading-[20px] font-medium font-inter text-black text-left inline-block">
              {reader.pageNumber + '/' + reader.pageCount}
            </div>
          </button>
          <button onClick={reader.nextPage} className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-gray-100 rounded-[0px_4px_4px_0px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsarrowbackios1.svg"
            />
          </button>
        </div>
        <div className="flex flex-row items-start justify-start">
          <button onClick={reader.zoomIn} className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-gray-100 rounded-[4px_0px_0px_4px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolszoominrounded.svg"
            />
          </button>
          <button className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-white box-border relative h-[38px] flex flex-row items-center justify-center">
            <div className="relative text-sm leading-[20px] font-medium font-inter text-black text-left inline-block">
              {Math.round(reader.scale * 100)}%
            </div>
          </button>
          <button onClick={reader.zoomOut} className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-gray-100 rounded-[0px_4px_4px_0px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolszoomout.svg"
            />
          </button>
        </div>
        <div onClick={high} className="flex flex-row items-start justify-start">
          <button className="cursor-pointer [border:1px_solid_#e8e8e8] p-[8px_12px] bg-[transparent] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-400">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsformatunderlinedsquiggle.svg"
            />
          </button>
          <button className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-[transparent] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsspeakernotesoutline.svg"
            />
          </button>
          <button className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-[transparent] rounded-[4px_0px_0px_4px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsrefresh.svg"
            />
          </button>
          <button className="cursor-pointer [border:1px_solid_#f3f4f6] p-[8px_12px] bg-[transparent] rounded-[4px_0px_0px_4px] box-border relative h-[38px] flex flex-row items-center justify-center hover:bg-gray-200">
            <img
              className="relative w-[24px] h-[24px] shrink-0 overflow-hidden"
              alt=""
              src="../materialsymbolsclose.svg"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
