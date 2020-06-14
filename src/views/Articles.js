import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchItems } from 'actions/itemsActions';

import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

class Articles extends React.Component {
  state = {
    searchTitle: '',
    searchContent: '',
    searchDate: '',
    searchRating: '',
    itemsPerPage: 6,
    currentPage: 1,
  };

  componentDidMount() {
    const { fetchNotes } = this.props;
    fetchNotes();
  }

  searchTitle = e => {
    this.setState({ searchTitle: e.target.value });
  };

  searchContent = e => {
    this.setState({ searchContent: e.target.value });
  };

  searchDate = e => {
    this.setState({ searchDate: e.target.value });
  };

  searchRating = e => {
    this.setState({ searchRating: e.target.value });
  };

  clearFilters = () => {
    this.setState({ searchTitle: '', searchContent: '', searchDate: '', searchRating: '' });
  };

  setCurrentPage = number => {
    this.setState({ currentPage: number });
  };

  render() {
    const { isAuthenticated } = this.props;
    let { articles } = this.props;
    const {
      itemsPerPage,
      searchTitle,
      searchContent,
      searchDate,
      searchRating,
      currentPage,
    } = this.state;
    const allElementCount = articles.length;

    // === Redirecy if not loged in ===
    if (!isAuthenticated) {
      return <Redirect to={routes.login} />;
    }

    // === Filters ===
    if (articles.length > 0) {
      articles = articles.filter(article => {
        return article.title.indexOf(searchTitle) !== -1;
      });

      articles = articles.filter(article => {
        return article.noteContent.indexOf(searchContent) !== -1;
      });

      articles = articles.filter(article => {
        return article.created.indexOf(searchDate) !== -1;
      });

      articles = articles.filter(article => {
        return String(article.rating).indexOf(searchRating) !== -1;
      });
    }

    const filteredElementCount = articles.length;

    // === Pagination ===
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    articles = articles.slice(indexOfFirstPost, indexOfLastPost);

    return (
      <GridTemplate
        searchTitleFn={this.searchTitle}
        searchContentFn={this.searchContent}
        searchDateFn={this.searchDate}
        searchRatingFn={this.searchRating}
        clearFiltersFn={this.clearFilters}
        filterSearchTitleValue={searchTitle}
        filterSearchContentValue={searchContent}
        filterSearchDateValue={searchDate}
        filterSearchRatingValue={searchRating}
        allElement={allElementCount}
        filteredElementCount={filteredElementCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={this.setCurrentPage}
      >
        {articles.map(({ title, noteContent, articleUrl, created, lastEdit, id, rating }) => (
          <Card
            key={id}
            id={id}
            title={title}
            content={noteContent}
            articleUrl={articleUrl}
            created={created}
            lastEdit={lastEdit}
            rating={rating}
          />
        ))}
      </GridTemplate>
    );
  }
}

Articles.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      noteContent: PropTypes.string,
      // created: PropTypes.string.isRequired,
    }),
  ),
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = state => {
  const { articles } = state.items;
  const { isAuthenticated } = state.auth;
  return { articles, isAuthenticated };
};

const mapDispachToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchItems('articles')),
});

export default connect(mapStateToProps, mapDispachToProps)(Articles);
