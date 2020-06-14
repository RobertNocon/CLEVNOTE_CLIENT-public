import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import { connect } from 'react-redux';
// import axios from 'axios';
import PropTypes from 'prop-types';
import { fetchItems } from 'actions/itemsActions';
import { Redirect } from 'react-router-dom';
import { routes } from 'routes';

class DetailsPage extends Component {
  state = {
    // activeItem: {
    //   id: '',
    //   userId: '',
    //   type: '',
    //   title: '',
    //   noteContent: '',
    //   created: '',
    //   lastEdit: '',
    //   rating: 0,
    //   isActive: 1,
    // },
    isNewItemBarVisible: null, // tu dodamy opcke edycji
    // shoudUpdate: false, // tu dodamy opcke edycji
  };

  toggleNewItembar = () => {
    // to bedzie do opcji edycji
    this.setState(prevState => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  closeNewItembar = () => {
    // to bedzie do opcji edycji
    this.setState({ isNewItemBarVisible: false });
  };

  getItems = () => {
    // console.log('notatki nie ma w store');
    const { fetchNotes } = this.props;
    const activeItem = {
      id: '',
      userId: '',
      type: '',
      title: '',
      noteContent: '',
      articleUrl: '',
      created: '',
      lastEdit: '',
      rating: 0,
      isActive: 1,
      dateUser: '',
    };
    // console.log('func getItems');
    fetchNotes();
    return activeItem;
  };

  render() {
    const { activeItems, isAuthenticated } = this.props;
    let [activeItem] = activeItems;
    const { isNewItemBarVisible } = this.state;
    if (activeItems.length === 0) {
      activeItem = this.getItems();
    }
    // if(activeItem.articleUrl.includes('http'))
    if (!isAuthenticated) {
      return <Redirect to={routes.login} />;
    }

    return (
      <>
        {/* {this.state.shoudUpdate ? this.refreshState() : null} */}
        <DetailsTemplate
          // id={activeItem.id}
          title={activeItem.title}
          content={activeItem.noteContent}
          articleUrl={activeItem.articleUrl}
          type={activeItem.type}
          dateUser={activeItem.dateUser}
          created={activeItem.created}
          lastEdit={activeItem.lastEdit}
          rating={activeItem.rating}
          isActive={activeItem.isActive}
          openEdit={this.toggleNewItembar}
          refreshState={this.refreshState}
        />
        {activeItem.id && (
          <NewItemBar
            handleClose={this.closeNewItembar}
            isVisible={isNewItemBarVisible}
            activeItem={activeItem}
            // enableReinitialize
          />
        )}
      </>
    );
  }
}

DetailsPage.propTypes = {
  activeItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      // content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
};

DetailsPage.defaultProps = {
  // id: '',
  // userId: '',
  // type: '',
  // title: 'a',
  // noteContent: '',
  // created: '',
  // lastEdit: '',
  // rating: 0,
  // isActive: 1,
  // activeItem: [{ id: '' }],
  // activeItem: {
  //   id: 0,
  //   title: '',
  //   noteContent: '',
  //   articleUrl: '',
  //   created: '',
  //   rating: 0,
  //   dateUser: '',
  // },
  activeItems: [],
};

//  --- ownProps - this param get all props from current component ---
const mapStateToProps = (state, ownProps) => {
  //  ---If we enter by click, note will be get from store  ---
  if (state.items[ownProps.pageContext]) {
    const { isAuthenticated } = state.auth;
    const noteIdAsInt = parseInt(ownProps.match.params.id, 10);
    return {
      isAuthenticated,
      activeItems: state.items[ownProps.pageContext].filter(item => item.id === noteIdAsInt), // działa
    };
  }
  //  ---If we enter by outside link, note will be get from api  ---
  return {};
};
// pobierzemy notatki
const mapDispachToProps = (dispatch, ownProps) => ({
  fetchNotes: () => dispatch(fetchItems(ownProps.pageContext)),
});

// chyba najlepiejbedzie to przeniesc do actions, niech tam bedzie warunek
// jesli this.props.activeItem.length !== 0 to robimy filter po dynamicznym kluczu i zwracamy.
// jezeli tabluca pusta, strzelamy axiosem

export default withContext(connect(mapStateToProps, mapDispachToProps)(DetailsPage));

// import React, { Component } from 'react';
// import DetailsTemplate from 'templates/DetailsTemplate';
// import withContext from 'hoc/withContext';
// import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
// import { connect } from 'react-redux';
// import axios from 'axios';
// import PropTypes from 'prop-types';

// class DetailsPage extends Component {
//   state = {
//     activeItem: {
//       id: '',
//       userId: '',
//       type: '',
//       title: '',
//       noteContent: '',
//       created: '',
//       lastEdit: '',
//       rating: 0,
//       isActive: 1,
//     },
//     isNewItemBarVisible: null, // tu dodamy opcke edycji
//     shoudUpdate: false, // tu dodamy opcke edycji
//   };

//   componentDidMount() {
//     //  --- Check is note is in store ---
//     if (this.props.activeItem.length !== 0) {
//       console.log(this.props.activeItem);
//       //  --- Destructure note from mapStateToProps ---
//       const [activeItem] = this.props.activeItem;
//       this.setState({ activeItem });
//       //  --- If there's no item in store, get from api ---
//     } else {
//       console.log('2');
//       console.log(this.props.activeItem.length);
//       const { id } = this.props.match.params;
//       axios
//         .get(`https://localhost:44381/api/Notes/${id}`)
//         .then(({ data }) => {
//           let [DATA] = data;
//           this.setState({ activeItem: DATA });
//         })
//         .catch(err => console.log(err));
//     }
//   }

//   toggleNewItembar = () => {
//     //to bedzie do opcji edycji
//     this.setState(prevState => ({
//       isNewItemBarVisible: !prevState.isNewItemBarVisible,
//     }));
//   };

//   closeNewItembar = () => {
//     //to bedzie do opcji edycji
//     this.setState({ isNewItemBarVisible: false, shoudUpdate: true });
//   };

//   refreshState = () => {
//     if (this.props.activeItem.length !== 0) {
//       console.log(this.props.activeItem);
//       //  --- Destructure note from mapStateToProps ---
//       const [activeItem] = this.props.activeItem;
//       this.setState({ activeItem });
//       //  --- If there's no item in store, get from api ---
//     } else {
//       console.log('2');
//       console.log(this.props.activeItem.length);
//       const { id } = this.props.match.params;
//       axios
//         .get(`https://localhost:44381/api/Notes/${id}`)
//         .then(({ data }) => {
//           let [DATA] = data;
//           this.setState({ activeItem: DATA });
//         })
//         .catch(err => console.log(err));
//     }
//     this.setState({ isNewItemBarVisible: false, shoudUpdate: false });

//     console.log('refreshState DONE');
//   };

//   render() {
//     const { activeItem } = this.state;
//     const { isNewItemBarVisible } = this.state;

//     return (
//       <>
//         {this.state.shoudUpdate ? this.refreshState() : null}
//         <DetailsTemplate
//           // id={activeItem.id}
//           title={activeItem.title}
//           content={activeItem.noteContent}
//           type={activeItem.type}
//           created={activeItem.created}
//           lastEdit={activeItem.lastEdit}
//           rating={activeItem.rating}
//           isActive={activeItem.isActive}
//           openEdit={this.toggleNewItembar}
//           refreshState={this.refreshState}
//         />
//         {activeItem.id && (
//           <NewItemBar
//             handleClose={this.closeNewItembar}
//             isVisible={isNewItemBarVisible}
//             activeItem={activeItem}
//           />
//         )}
//       </>
//     );
//   }
// }

// // DetailsPage.propTypes = {
// //   activeItem: PropTypes.objectOf(PropTypes.id),
// // };

// // DetailsPage.defaultProps = {
// //   activeItem: {},
// // };

// //  --- ownProps - this param get all props from current component ---
// const mapStateToProps = (state, ownProps) => {
//   //  ---If we enter by click, note will be get from store  ---
//   if (state[ownProps.pageContext]) {
//     const noteIdAsInt = parseInt(ownProps.match.params.id, 10);
//     return {
//       activeItem: state[ownProps.pageContext].filter(item => item.id === noteIdAsInt), // działa
//     };
//   }
//   //  ---If we enter by outside link, note will be get from api  ---
//   return {};
// };

// // chyba najlepiejbedzie to przeniesc do actions, niech tam bedzie warunek
// // jesli this.props.activeItem.length !== 0 to robimy filter po dynamicznym kluczu i zwracamy.
// // jezeli tabluca pusta, strzelamy axiosem

// export default withContext(connect(mapStateToProps)(DetailsPage));
