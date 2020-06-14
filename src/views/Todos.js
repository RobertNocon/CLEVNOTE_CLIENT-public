import React from 'react';
import PropTypes from 'prop-types';

// Pozwala łączyć się ze storem
import { connect } from 'react-redux';
import { fetchItems } from 'actions/itemsActions';

import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';

import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

// const Todos = ({ todos }) => (
class Todos extends React.Component {
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
    let { todos } = this.props;
    const {
      itemsPerPage,
      searchTitle,
      searchContent,
      searchDate,
      searchRating,
      currentPage,
    } = this.state;
    const allElementCount = todos.length;

    if (todos.length > 0) {
      todos = todos.filter(todo => {
        return todo.title.indexOf(searchTitle) !== -1;
      });

      todos = todos.filter(todo => {
        return todo.noteContent.indexOf(searchContent) !== -1;
      });

      todos = todos.filter(todo => {
        return todo.created.indexOf(searchDate) !== -1;
      });

      todos = todos.filter(todo => {
        return String(todo.rating).indexOf(searchRating) !== -1;
      });
    }

    const filteredElementCount = todos.length;

    // === Pagination ===
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    todos = todos.slice(indexOfFirstPost, indexOfLastPost);

    if (!isAuthenticated) {
      return <Redirect to={routes.login} />;
    }

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
        {todos.map(({ title, noteContent, dateUser, created, lastEdit, id, rating }) => (
          <Card
            key={id}
            id={id}
            cardType="todos"
            title={title}
            content={noteContent}
            created={created}
            dateUser={dateUser}
            lastEdit={lastEdit}
            rating={rating}
          />
        ))}
      </GridTemplate>
    );
  }
}
// );

Todos.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      noteContent: PropTypes.string,
      // created: PropTypes.string.isRequired,
    }),
  ),
};

Todos.defaultProps = {
  todos: [],
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  const { todos } = state.items;
  return { todos, isAuthenticated };
};

const mapDispachToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchItems('todos')),
});

export default connect(mapStateToProps, mapDispachToProps)(Todos);
