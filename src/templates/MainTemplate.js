// ----- Przekazuje theme i okresla na jakim PageType strony jesteśmy -----

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// HOC - zapewnia informacje w MainTemplate o ścieżce /Article, Note.. czyli w jakim jesteśmy location i pathname
import { withRouter } from 'react-router';

// Przekaże typ strony - bedzie komponentem
import PageContext from 'context';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import { theme } from 'theme/mainTheme';

class MainTemplate extends Component {
  state = {
    pageType: 'notes',
  };

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  // ------ Logika sprawdzająca na jakim root się obecnie znajdujemy ------
  setCurrentPage = (prevState = '') => {
    const pageTypes = ['todos', 'articles', 'notes'];
    const {
      location: { pathname },
    } = this.props;
    // czy tablica wyżej pageTypes zawiera aktualny root
    const [currentPage] = pageTypes.filter(page => pathname.includes(page));
    // jeżeli obecny state nie zawiera prawidłowej informacji w jakim jestesmy root, ustawia go, warunek konieczny by nie było petli
    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
      // console.log(this.state);
    }
  };

  render() {
    const { children } = this.props;
    const { pageType } = this.state;

    // console.log({ ...this.props });
    return (
      <div>
        {/* Przekazujemy PageType z contextu */}
        <PageContext.Provider value={pageType}>
          <GlobalStyle />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

// HOC withRouter - zapewnia informacje w MainTemplate o ścieżce /Article, Note.. czyli w jakim jesteśmy location i pathname
export default withRouter(MainTemplate);
