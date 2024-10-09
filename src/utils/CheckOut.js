import React, {useEffect} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(
  'pk_test_51Q79iASJoLs6JLqrlseYGNhISQxNdMt5zNDor2L46e6m6dEFTjcxD9yGSpp7K8dzlDOgULBOSxO3du478WNMc2mu00TO7mZ9xQ',
) // Replace with your actual publishable key

const CheckOut = () => {

    useEffect(() => {
        const createPaymentIntent = async () => {
          try {

            const stripe = await stripePromise;
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/getCheckoutSession`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                 
                },
                credentials: "include"
                
              })
        
              console.log(response)

              const session = await response.json()
      const result = await stripe.redirectToCheckout({ sessionId: session.session.id })
      console.log(result)
      if (result.error) {
        toast.error(result.error.message)
      }

            
          } catch (err) {
            toast.error('Failed to create payment intent');
          }
        };
    
        createPaymentIntent();
      }, []);

  return null
}

export default CheckOut