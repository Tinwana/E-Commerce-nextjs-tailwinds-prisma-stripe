import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4  ">
      {children}
    </section>
  );
};

export default Container;
