import facebook from "../../assets/images/facebook_icon.webp";
import email from "../../assets/images/email-icon.webp";
import insta from "../../assets/images/instagram_icon.webp";
import whiteLogo from "../../assets/images/US-Chronical-White.webp";

function Footer() {
  return (
    <>
      <footer
        id="footer-section"
        className="w-full bg-black flex  justify-start pt-5 flex-col items-center z-50 h-40"
      >
        <img
          src={whiteLogo}
          className="w-32 h-10 overflow-hidden"
          alt="US Chronical Icon"
        />
        <p className="text-white text-center text-xs sm:text-sm mt-1 sm:mt-2">
          Copyright ©2024 US Chronical Inc. All rights reserved.
        </p>

        <div className="flex flex-row w-[100px] mt-1 sm:mt-3 sm:w-2/12 md:w-[110px] lg:w-[110px] xl:w-[110px] 2xl:w-[110px] justify-center space-x-3 ">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <img src={facebook} alt="Facebook" className="" />
          </a>

          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img src={insta} alt="email icon" />
          </a>

          <a href="mailto:hmsneed@gmail.com" target="_blank" rel="noreferrer">
            <img src={email} alt="email icon" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
