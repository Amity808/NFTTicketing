import React from "react";

const Footer = () => {
  return (
    <div className=" text-white flex flex-row justify-around">
      <div>
        <h1 className=" text-3xl font-bold">Stay Studio</h1>
        <p className=" w-[380px] h-[128px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus
          temporibus rem fugiat officia, aspernatur vero iste quas porro
          distinctio voluptatibus qui, quaerat laboriosam veritatis culpa
          perferendis vel deleniti quis.
        </p>
      </div>
      <div className=" flex flex-row gap-6">
        <div>
          <h3 className="text-2xl  font-medium">Resources</h3>
          <p>Coming Soon</p>
          <ul className=" list-none">
            <li>Help Center</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl  font-medium">Company</h3>
          <ul className=" list-none">
            <li>Our Team</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className=" text-2xl  font-medium">Contact</h3>
        <ul className=" list-none flex">
          <li>Git</li>
          <li>Twi</li>
          <li>Ins</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
