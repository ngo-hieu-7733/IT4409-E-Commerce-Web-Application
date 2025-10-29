import Container from "../Container";
import FooterBottom from "./FooterBottom";
import FooterMiddle from "./FooterMiddle";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <>
      <footer className="border-t">
        <Container>
          <FooterTop/>
          <FooterMiddle />
          <FooterBottom />
        </Container>
      </footer>
    </>
  )
};

export default Footer;
