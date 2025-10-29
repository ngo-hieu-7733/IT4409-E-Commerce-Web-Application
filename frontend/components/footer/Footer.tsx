import Container from "../Container";
import FooterMiddle from "./FooterMiddle";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <>
      <footer className="border-t">
        <Container>
          <FooterTop/>
          <FooterMiddle />
          
        </Container>
      </footer>
    </>
  )
};

export default Footer;
