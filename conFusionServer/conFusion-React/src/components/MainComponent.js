import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import HowToUse from './HowToUseComponent';
import DishDetail from './DishDetailComponent';
import Navigation from './NavigationComponent';
import { Switch, Route, Redirect , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }   
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

 

  render() {

    const DishWithId = ({match})=>{
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish._id===parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
        />
      );
    }

    return (
      <div id="page">
        <Navigation />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path="/home" component={() => <Menu dishes={this.props.dishes}/>}/>
              <Route path="/home/:dishId" component={DishWithId}/>
              <Route exact path="/contactus" component={() =><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
              <Route exact path="/howtouse" component={() => <HowToUse/>}/>
              <Redirect to="/home"/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
