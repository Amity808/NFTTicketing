// import LoadingIcon from "@/components/LoadingIcon";

const Preloader = () => {
  return (
    <section className="h-screen bg-[#4461F2]">
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-infinity loading-xs"></span>
        <span className="loading loading-infinity loading-sm"></span>
        <span className="loading loading-infinity loading-md"></span>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    </section>
  );
};

export default Preloader;
