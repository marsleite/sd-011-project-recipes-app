import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FiltersDoneAndFavorites from '../components/FiltersDoneAndFavorites';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

export default class ReceitasFavoritas extends Component {
  constructor() {
    super();
    this.state = {
      itemsToRender: [],
      itemsToRenderBD: [],
      shareButton: false,
    };
    this.setItemsToRenderFiltered = this.setItemsToRenderFiltered.bind(this);
  }

  componentDidMount() {
    this.setItemsToRender();
  }

  setItemsToRender() {
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      this.setState({
        itemsToRender: JSON.parse(localStorage.getItem('favoriteRecipes')),
        itemsToRenderBD: JSON.parse(localStorage.getItem('favoriteRecipes')),
      });
    }
  }

  setItemsToRenderFiltered(comidaOrBebida) {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const { itemsToRenderBD } = this.state;
      if (comidaOrBebida === 'comida' || comidaOrBebida === 'bebida') {
        const filterdPerType = itemsToRenderBD.filter(
          (recipe) => recipe.type === comidaOrBebida,
        );
        this.setState({
          itemsToRender: filterdPerType,
        });
      } else {
        this.setState({
          itemsToRender: JSON.parse(localStorage.getItem('favoriteRecipes')),
          itemsToRenderBD: JSON.parse(localStorage.getItem('favoriteRecipes')),
        });
      }
    }
  }

  removeFavorite(id) {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const removedFavorite = favoriteItems.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removedFavorite));
    this.setState({
      itemsToRender: removedFavorite,
    });
  }

  redirectToRecipeDetails(id, foodOrDrink) {
    const { history } = this.props;
    history.push(`/${foodOrDrink}/${id}`);
  }

  shareLinkClick(id, foodOrDrink) {
    const magicNumber = 2000;
    navigator.clipboard.writeText(`${window.location.origin}/${foodOrDrink}/${id}`);
    this.setState({ shareButton: true });
    setTimeout(() => this.setState({
      shareButton: false,
    }), magicNumber);
  }

  renderItems() {
    const { itemsToRender, shareButton } = this.state;
    return itemsToRender.map((item, index) => {
      if (item.type === 'comida') {
        return (
          <div className="recipe-card" style={ { margin: '20px auto', width: '80vw' } } key={ item.id }>
            <div
              onClick={ () => this.redirectToRecipeDetails(item.id, 'comidas') }
              onKeyDown={ () => this.redirectToRecipeDetails(item.id, 'comidas') }
              role="button"
              tabIndex="0"
            >
              <h3 style={ { fontWeight: 'bolder' } } data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ item.image }
                alt="imagem comida"
                className="recipe-image"
              />
            </div>
            <p style={ { fontSize: '21px' } } data-testid={ `${index}-horizontal-top-text` }>
              { item.area }
              {' '}
              -
              {' '}
              { item.category }
            </p>
            <div style={ { display: 'flex', alignItems: 'center' } }>
              <button
                onClick={ () => this.shareLinkClick(item.id, 'comidas') }
                type="button"
                className="share-button"
                style={ { backgroundColor: 'inherit' } }
              >
                {/* <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              /> */}
                <i className="fas fa-share-alt-square" />
              </button>
              <button onClick={ () => this.removeFavorite(item.id) } className="like-button" style={ { padding: '2px 8px', height: '38.5px', display: 'flex', alignItems: 'center' } } type="button">
                {/* <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="White Heart"
              /> */}
                <i className="fas fa-heart like-button-liked" style={ { fontSize: '21px' } } />
              </button>
              {shareButton ? <span style={ { color: 'red', fontSize: '16px' } }>Link copiado!</span> : null}
            </div>
          </div>);
      }
      return (
        <div className="recipe-card" style={ { margin: '20px auto', width: '80vw' } } key={ item.id }>
          <div
            onClick={ () => this.redirectToRecipeDetails(item.id, 'bebidas') }
            onKeyDown={ () => this.redirectToRecipeDetails(item.id, 'bebidas') }
            role="button"
            tabIndex="0"
          >
            <h3 style={ { fontWeight: 'bolder' } } data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="imagem bebida"
              className="recipe-image"
            />
          </div>
          <p style={ { fontSize: '21px' } } data-testid={ `${index}-horizontal-top-text` }>{ item.alcoholicOrNot }</p>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            <button
              onClick={ () => this.shareLinkClick(item.id, 'bebidas') }
              className="share-button"
              style={ { backgroundColor: 'inherit' } }
              type="button"
            >
              {/* <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            /> */}
              <i className="fas fa-share-alt-square" />
            </button>
            <button onClick={ () => this.removeFavorite(item.id) } style={ { padding: '2px 8px', height: '38.5px', display: 'flex', alignItems: 'center' } } className="like-button" type="button">
              {/* <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="White Heart"
            /> */}
              <i className="fas fa-heart like-button-liked" style={ { fontSize: '21px' } } />
            </button>
            {shareButton ? <span style={ { color: 'red', fontSize: '16px' } }>Link copiado!</span> : null}
          </div>
        </div>);
    });
  }

  render() {
    return (
      <div>
        <Header title="Receitas Favoritas" />
        <FiltersDoneAndFavorites filterPerType={ this.setItemsToRenderFiltered } />
        { this.renderItems() }
      </div>
    );
  }
}

ReceitasFavoritas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
