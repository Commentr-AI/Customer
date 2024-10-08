import React, { useEffect, useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
} from '@coreui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const PricingComponent = () => {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
//   console.log(userInfo)
  const activePricingId =userInfo.plan.pricingId;
  const activePricingBilling =userInfo.billingType;
//   console.log(activePricingBilling)

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/pricings/getAllPricings`); // Replace with your actual API endpoint
        setPricingPlans(response.data.pricings); // Assuming the API returns an array of pricing plans

      } catch (err) {
        setError('Failed to fetch pricing data');
      } finally {
        setLoading(false);
      }
    };

    fetchPricingData();
  }, []);


  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or a more sophisticated UI
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div className="">
      <CRow>
        {pricingPlans.map((plan, index) => {
          // Check if the current plan is active
          const isActive = plan.pricingId === activePricingId;

          return (
            <CCol key={index} xs={12} sm={6} md={4} className="mb-4">
              <CCard className={`text-center ${isActive ? 'active-plan ' : 'shadow'}`} style={{ border: isActive ? '2px solid green' : "none" }}>
                {/* Card Header */}
                <CCardHeader>
                  <h4>{plan.title}</h4>
                  <div><span className='fs-1'>{activePricingBilling=='billed monthly' ? plan.monthlyPrice : plan.annualPrice}</span>/month</div>
                  <p className="text-muted">{activePricingBilling=='billed monthly' ? 'billed monthly' : 'billed Annuvally'}</p>
                </CCardHeader>

                {/* Card Body */}
                <CCardBody>
                  <CListGroup flush>
                    <CListGroupItem>{`${plan.replies} ${plan.replies <= 1 ? "Reply" : "Replies"}`}</CListGroupItem>
                    <CListGroupItem>{`${plan.communities} ${plan.communities <= 1 ? "Community" : "Communities"}`}</CListGroupItem>
                    <CListGroupItem>{`${plan.users} ${plan.users <= 1 ? 'account' : 'accounts'}`}</CListGroupItem>
                    <CListGroupItem>{`${plan.keywords} ${plan.keywords <= 1 ? 'Keyword' : 'Keywords'}`}</CListGroupItem>
                  </CListGroup>
                </CCardBody>

                {/* Card Footer */}
                <CCardFooter>
                  <CButton color={`${isActive ? 'success' : 'primary'} `} className="text-white" disabled={isActive}>
                    {isActive ? 'Active Plan' : 'Get Started'}
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          );
        })}
      </CRow>
    </div>

  );
};

export default PricingComponent;
