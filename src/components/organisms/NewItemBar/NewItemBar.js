import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Select from 'components/atoms/Select/Select';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import { connect } from 'react-redux';
import { addItem as addItemAction, editItem as editItemAction } from 'actions/itemsActions';
import { Formik, Form } from 'formik';
import Error from 'components/atoms/Error/Error';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  padding: 80px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  min-height: 100vh;
  min-width: 50%;
  max-width: 700px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  @media (max-width: 600px) {
    width: 80%;
    padding: 5px 5px;
    overflow: scroll;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  min-height: 30vh;
  @media (max-width: 600px) {
    margin: 30px 0 10px;
  }
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
  @media (max-width: 600px) {
    margin-top: 15px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 12px;
  height: 26px;
  width: 150px;
`;

class NewItemBar extends React.Component {
  state = {
    item: {
      id: 0,
      title: '',
      noteContent: '',
      articleUrl: '',
      created: '',
      rating: 0,
      dateUser: '',
    },
  };

  validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Too Short Title!')
      .max(255, 'Too Long Title, limit is 255 characters!')
      .required('Title Required!'),
    noteContent: Yup.string()
      .min(1, 'Too Short!')
      .required('Required!'),
  });

  // === If props from DetailsTemplate, set item to edit ===
  componentDidMount() {
    const { activeItem } = this.props;
    if (activeItem) {
      this.setState({ item: activeItem });
    }
  }

  sendNote = (pageContext, values) => {
    const { item } = this.state;
    const { editItem, addItem } = this.props;

    const isNewNote = !!item.id;
    if (isNewNote) {
      // console.log('edytuje notatkę');
      editItem(pageContext, values);
    }
    if (!isNewNote) {
      // console.log('dodaje notatkę');
      addItem(pageContext, values);
    }
  };

  setClickRating = i => {
    // === Prevent reinitialize form after change rating ===
    // this.setState({ enableReinitialize: false });
    this.setState(prevState => ({ item: { ...prevState.item, rating: i } }));
  };

  render() {
    const { pageContext, isVisible, handleClose } = this.props;
    const { item } = this.state;
    const isNewItem = !item.id;

    return (
      <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
        {isNewItem ? <Heading big>Add to {pageContext}</Heading> : <Heading big>Edit item</Heading>}

        <Formik
          validationSchema={this.validationSchema}
          initialValues={{ ...item }}
          // enableReinitialize={this.state.enableReinitialize}
          enableReinitialize
          onSubmit={values => {
            // addItem(pageContext, values);
            this.sendNote(pageContext, values);
            handleClose();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <StyledForm>
              {/* {JSON.stringify(values)} */}
              {pageContext === 'todos' && (
                <Select
                  status
                  value={values.rating}
                  onChange={handleChange}
                  type="number"
                  name="rating"
                  placeholder="Status"
                  onBlur={handleBlur}
                >
                  <option value="0">New</option>
                  <option value="1">In Progres</option>
                  <option value="2">Done</option>
                </Select>
              )}

              {pageContext === 'articles' && (
                <Select
                  stars
                  value={values.rating}
                  onChange={handleChange}
                  type="number"
                  name="rating"
                  placeholder="rating"
                  onBlur={handleBlur}
                >
                  <option value="0">☆ ☆ ☆ ☆ ☆</option>
                  <option value="1">★ ☆ ☆ ☆ ☆</option>
                  <option value="2">★ ★ ☆ ☆ ☆</option>
                  <option value="3">★ ★ ★ ☆ ☆</option>
                  <option value="4">★ ★ ★ ★ ☆</option>
                  <option value="5">★ ★ ★ ★ ★</option>
                </Select>
              )}

              <StyledInput
                type="text"
                name="title"
                placeholder="title"
                onBlur={handleBlur}
                value={values.title}
                onChange={handleChange}
                className={touched.title && errors.title ? 'has-error' : null}
              />
              <Error touched={touched.title} message={errors.title} />

              {pageContext === 'todos' && (
                <StyledInput
                  type="date"
                  name="dateUser"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateUser}
                />
              )}

              {pageContext === 'articles' && (
                <StyledInput
                  placeholder="link"
                  type="text"
                  name="articleUrl"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.articleUrl}
                />
              )}

              <StyledTextArea
                name="noteContent"
                as="textarea"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.noteContent}
                className={touched.noteContent && errors.noteContent ? 'has-error' : null}
              />
              <Error touched={touched.noteContent} message={errors.noteContent} />

              <StyledButton type="submit" activecolor={pageContext}>
                {isNewItem ? 'Add New' : 'Save'}
              </StyledButton>
              <br />
              <br />
            </StyledForm>
          )}
        </Formik>
        <StyledButton onClick={handleClose}>Back / Cancel</StyledButton>
      </StyledWrapper>
    );
  }
}

NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'todos', 'articles']),
  isVisible: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  activeItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    noteContent: PropTypes.string,
    articleUrl: PropTypes.string,
    created: PropTypes.string,
    rating: PropTypes.number,
    dateUser: PropTypes.string,
  }),
};

NewItemBar.defaultProps = {
  pageContext: 'notes',
  isVisible: false,
  activeItem: {
    id: 0,
    title: '',
    noteContent: '',
    articleUrl: '',
    created: '',
    rating: 0,
    dateUser: '',
  },
};

const mapDispatchToProps = dispatch => ({
  addItem: (itemType, itemContent) => dispatch(addItemAction(itemType, itemContent)),
  editItem: (itemType, itemContent) => dispatch(editItemAction(itemType, itemContent)),
});

export default withContext(connect(null, mapDispatchToProps)(NewItemBar));
