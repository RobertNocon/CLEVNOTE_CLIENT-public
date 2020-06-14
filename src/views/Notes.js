import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems } from 'actions/itemsActions';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/molecules/Card/Card';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

class Notes extends React.Component {
  state = {
    searchTitle: '',
    searchContent: '',
    searchDate: '',
    itemsPerPage: 12,
    currentPage: 1,
  };

  componentDidMount() {
    const { fetchNotes } = this.props;
    // store.dispatch(loginUser("testuser", "testuser"));
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

  clearFilters = () => {
    this.setState({ searchTitle: '', searchContent: '', searchDate: '' });
  };

  setCurrentPage = number => {
    this.setState({ currentPage: number });
  };

  render() {
    const { isAuthenticated } = this.props;
    let { notes } = this.props;
    const { itemsPerPage, searchTitle, searchContent, searchDate, currentPage } = this.state;
    const allElementCount = notes.length;

    if (notes.length > 0) {
      notes = notes.filter(note => {
        return note.title.indexOf(searchTitle) !== -1;
      });
    }

    if (notes.length > 0) {
      notes = notes.filter(note => {
        return note.noteContent.indexOf(searchContent) !== -1;
      });
    }

    if (notes.length > 0) {
      notes = notes.filter(note => {
        return note.created.indexOf(searchDate) !== -1;
      });
    }

    const filteredElementCount = notes.length;

    // === Pagination ===
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    notes = notes.slice(indexOfFirstPost, indexOfLastPost);

    // === Redirecy if not loged in ===
    if (!isAuthenticated) {
      return <Redirect to={routes.login} />;
    }

    return (
      <GridTemplate
        searchTitleFn={this.searchTitle}
        searchContentFn={this.searchContent}
        searchDateFn={this.searchDate}
        searchRatingFn={() => null}
        clearFiltersFn={this.clearFilters}
        filterSearchTitleValue={searchTitle}
        filterSearchContentValue={searchContent}
        filterSearchDateValue={searchDate}
        allElement={allElementCount}
        filteredElementCount={filteredElementCount}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={this.setCurrentPage}
      >
        {notes.map(({ title, noteContent, created, lastEdit, id, rating }) => (
          <Card
            key={id}
            id={id}
            cardType="notes"
            title={title}
            content={noteContent}
            created={created}
            lastEdit={lastEdit}
            rating={rating}
          />
        ))}
      </GridTemplate>
    );
  }
}

Notes.propTypes = {
  fetchNotes: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      noteContent: PropTypes.string,
    }),
  ),
};

Notes.defaultProps = {
  notes: [],
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;
  const { notes } = state.items;
  return { notes, isAuthenticated };
};

const mapDispachToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchItems('notes')),
});

export default connect(mapStateToProps, mapDispachToProps)(Notes);
