import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FAVORITES_TAP, SEARCH_TAP } from "../const/consts";
import { theme } from "../theme";
import { getLoggedInUser, removeToken } from "../utils/library";

export default function LoginButton({ selectedTap, setSelectedTap }) {
  const [loggedInUser, setLoggedInUser] = useState(false);

  const logout = () => {
    removeToken();
    setLoggedInUser(false);
  };

  const selctFavoriteTap = () => setSelectedTap(FAVORITES_TAP);
  const selctSearchTap = () => setSelectedTap(SEARCH_TAP);

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, []);

  return (
    <Container>
      {loggedInUser && (
        <>
          <Button
            hasShow={selectedTap === FAVORITES_TAP}
            onClick={selctSearchTap}
          >
            검색
          </Button>
          <Button
            hasShow
            isActivate={selectedTap === FAVORITES_TAP}
            onClick={selctFavoriteTap}
          >
            즐겨찾기
          </Button>
          <Button hasShow onClick={logout}>
            로그아웃
          </Button>
        </>
      )}
      {!loggedInUser && (
        <Button hasShow>
          <Link to="/login">로그인</Link>
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const Button = styled.button`
  display: ${(props) => (props.hasShow ? "block" : "none")};
  background-color: ${theme.backColor};
  border: 1px solid white;
  border-radius: 6px;
  padding: 0.3rem 1rem;
  color: ${theme.fontColor};
  :hover {
    font-weight: 600;
    cursor: pointer;
  }
`;