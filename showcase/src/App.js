import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

import Body from "./Body";
import { media, SCREEN_SIZES } from "./content/StyledContent";
import Sidebar from "./Sidebar";

const StyledContainer = styled.div`
  display: grid;
  min-height: 100vh;

  ${media.md`
    grid:
      'sidebar body'
      1fr / 24%;
  `}
`;

const App = () => {
  const isMediumOrLarger = useMediaQuery({ minWidth: SCREEN_SIZES.md });

  // toggle sidebar display
  const [showSidebar, setShowSidebar] = useState(false);
  //! Antipattern this is unnesesary omplicated
  // const isSidebarShown = isMediumOrLarger || (!isMediumOrLarger && showSidebar);
  const isSidebarShown = isMediumOrLarger || showSidebar;

  return (
    <StyledContainer>
      {isSidebarShown && <Sidebar setShowSidebar={setShowSidebar} />}
      <Body
        setShowSidebar={setShowSidebar}
        isMediumOrLarger={isMediumOrLarger}
      />
    </StyledContainer>
  );
};

export default hot(module)(App);
