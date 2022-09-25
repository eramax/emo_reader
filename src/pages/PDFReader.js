import Header from "../components/Header";
import Highlight from "../components/Highlight";
//import PdfView from "../components/PdfView";
import PdfView from "../components/pdf-view";

const PDFReader = () => {
  return (
    <div className="relative bg-gray-300 w-full h-screen  overflow-y-hidden flex flex-col items-start justify-start text-center text-lg text-gray-600 font-inter">
      <Header />
      <div className="flex-[1] self-stretch flex flex-row items-start justify-start">
        <div className="overflow-y-auto h-screen self-stretch border-t-[0px_solid_#8a85ab] border-r-[1px_solid_#8a85ab] border-b-[0px_solid_#8a85ab] border-l-[0px_solid_#8a85ab] box-border relative w-[471px] shrink-0 flex flex-col p-[20px_0px] items-start justify-start gap-[15px]">
          <b className="self-stretch relative tracking-[0.1em] uppercase inline-block">
            highlights
          </b>
          <div className="flex-[1] self-stretch flex flex-col items-start justify-start gap-[10px]">
            <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />
            <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />  <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            /> <Highlight
              title="Radix · TailwindCSS"
              body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim ut."
            />
          </div>
        </div>
        <PdfView url="1.pdf"/>
      </div>
    </div>
  );
};

export default PDFReader;
