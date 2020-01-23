import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_eCMBUFCEJKsMtJNHAHfS95au00aw5Oe3Wt';

	const onToken = token => {
		console.log(token);
		alert('Thanks for your payment!');
	};
	return (
		<StripeCheckout
			label='Pay Now'
			name='CROWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is: $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
