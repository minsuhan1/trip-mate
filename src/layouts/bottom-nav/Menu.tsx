import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 70px;

  img {
    width: 40px;
    height: 40px;
    filter: invert(82%) sepia(10%) saturate(19%) hue-rotate(65deg)
      brightness(86%) contrast(92%);
  }

  label {
    font-size: 1.2rem;
    color: #b3b3b3;
  }
`;

function Menu(props: { icon: string; label: string }) {
  return (
    <StyledDiv>
      <img src={props.icon} alt="nav-icon" />
      <label>{props.label}</label>
    </StyledDiv>
  );
}

export default Menu;
