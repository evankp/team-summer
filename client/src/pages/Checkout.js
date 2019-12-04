import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/checkoutForm';
import { withPageContext } from '../components/pageContext';

const apiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

  renderForm = () => {
    const {
      history,
      activateToast,
      userDetails: {id: { userId }},
      location: {state: { projectId, projectTitle }}
    } = this.props

    return (
      <StripeProvider apiKey={apiKey}>
        <Elements>
          <CheckoutForm
            projectId={projectId}
            projectTitle={projectTitle}
            userId={userId}
            history={history}
            activateToast={activateToast}
            handlePmtStatus={this.handlePmtStatus} />
        </Elements>
      </StripeProvider>
    );
  }

  render() {
    return (
      <div className="checkout">
        {this.renderForm()}
      </div>
    );
  }
}

export default withPageContext(Checkout);