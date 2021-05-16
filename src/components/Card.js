class Card{
  constructor (name, link, id, userId,  likes, owner, handleCardClick, handleCardDelete, handleLikeAdd, handleLikeDelete, cardSelector, api) {
    this._name = name;
    this._link = link;
    this._id = id;
    this._userId = userId
    this._likes = likes;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeDelete = handleLikeDelete;
    this._handleLikeAdd = handleLikeAdd;
    this._api = api;
    this._element = document.querySelector(this._cardSelector).content
  }

  createCard () {
    this._createView()
    const cardImage = this._view.querySelector('.element__image');
    const cardTitle = this._view.querySelector('.element__title');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    this._setEventListeners();
    this._createTrashButton()
    this._updateLikesView()

    return this._view;
  }

  _setEventListeners(){
    
    this._view.querySelector('.group').addEventListener('click', () => {
     if(this._isLiked() === true) {
       this._handleLikeDelete() 
       this._deleteLikeButtonFunction() 
     } else {
      this._handleLikeAdd();
      this._addLikeButtonFunction()
     } 
     
    }) 
    this._view.querySelector('.element__image').addEventListener('click', () => 
    {this._handleCardClick({link: this._link, name: this._name})});
    this._view.querySelector('.trash-button').addEventListener('click', () => 
    {this._handleCardDelete()})
  }

  _createView() {
    this._view = this._element.querySelector('.element').cloneNode(true);
  }

  _addLikeButtonFunction(){
    const likeButton = this._view.querySelector('.group');
    
    likeButton.classList.add('group_active');
  }

  _deleteLikeButtonFunction(){   
    this._view.querySelector('.group').classList.remove('group_active');
  }

   addTrashButtonFunction() {
    this._view.remove();
  }

  _createTrashButton(){
  if(this._renderTrashButton() === true){
    this._view.querySelector('.trash-button').classList.remove('trash-button_none');
  }else{
    this._view.querySelector('.trash-button').classList.add('trash-button_none');
  }
 }

  _renderTrashButton(){
      return this._owner._id === this._userId;
  }

  _isLiked(){
    return this._likes.some((element) => {
       return element._id === this._userId;
    })
  }

  _renderLike(){
    if(this._isLiked() === true){
      this._addLikeButtonFunction()
    }else{
      this._deleteLikeButtonFunction();
    }
  }

  _updateLikesView(){
    this._view.querySelector('.like-counter').textContent = this._likes.length;
    this._renderLike()
  }

  setLikesInfo(data){
    this._likes = data
    this._updateLikesView();
  }
}


export {Card};