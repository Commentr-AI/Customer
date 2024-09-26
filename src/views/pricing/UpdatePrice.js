import React ,{useState, useEffect} from 'react';
import { useGetPriceQuery, useUpdatePriceMutation } from '../../app/service/PriceApiSlice'
import { useParams, useNavigate } from 'react-router-dom'
import './Pricing.css' // Import external CSS for styling
import { toast } from 'react-toastify'


const UpdatePrice = () => {
    const { id } = useParams()
    
  const { data: price, isLoading, error } = useGetPriceQuery(id)
  // console.log(price)
  const [updatePrice, { isLoading: isUpdating }] = useUpdatePriceMutation()
  const navigate = useNavigate()
  // console.log(id)

  const [pricingDetails, setPricingDetails] = useState({
    title: "",
    monthlyPrice: "",
    annualPrice: "",
    users: '',
    replies: '',
    communities: '',
    // offerList: [],
  });

  
 // Fetch initial data and set state
 useEffect(() => {
  if (price) {
    setPricingDetails({
      title: price?.pricing?.title || '',
      monthlyPrice: price?.pricing?.monthlyPrice || '',
      annualPrice: price?.pricing?.annualPrice || '',
      users: price?.pricing?.users || '',
      replies: price?.pricing?.replies || '',
      communities: price?.pricing?.communities || '',
      // offerList: price?.pricing?.offerList || [],  // Ensure offerList is initialized
    });
  }
}, [price]);


  

  if (isLoading) return <h2>Loading...</h2>
  if (error) return <h2>Error loading Price</h2>

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    console.log(pricingDetails);

    try {
      const response = await updatePrice({id,pricingDetails}).unwrap();
      console.log(response);
      toast.success("Pricing Updated ")
      navigate("/pricing"); // Redirect after successful creation
    } catch (error) {
      console.error("Error updating pricing package", error);
      toast.error("Failed to update pricing package");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    //   const data = await response.json();
    //   console.log(data);
    }
    
  }

  // const [newOffer, setNewOffer] = useState("");

  const handleAddOffer = () => {
    if (newOffer) {
      setPricingDetails((prevState) => ({
        ...prevState,
        offerList: [
          ...prevState.offerList,
          { id: Date.now(), text: newOffer },
        ],
      }));
      setNewOffer("");
    }
  };

  const handleEditOffer = (id, updatedText) => {
    setPricingDetails((prevState) => ({
      ...prevState,
      offerList: prevState.offerList.map((offer) =>
        offer.id === id ? { ...offer, text: updatedText } : offer
      ),
    }));
  };

  const handleDeleteOffer = (id) => {
    setPricingDetails((prevState) => ({
      ...prevState,
      offerList: prevState.offerList.filter((offer) => offer.id !== id),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPricingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    navigate('/pricing')
  }

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Add New Price</h2>
      <form onSubmit={handleSubmit} className="pricing-form">
        <div className='group'>
          <div className="form-group">
            <label className='label'>Package Name:</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={pricingDetails.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='label'>Monthly Price:</label>
            <input
              type="text"
              name="monthlyPrice"
              className="form-control"
              value={pricingDetails.monthlyPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='label'>Annually Price:</label>
            <input
              type="text"
              name="annualPrice"
              className="form-control"
              value={pricingDetails.annualPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='group'>
          <div className="form-group">
            <label className='label'>Users:</label>
            <input
              type="text"
              name="users"
              className="form-control"
              value={pricingDetails.users}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='label'>Replies:</label>
            <input
              type="text"
              name="replies"
              className="form-control"
              value={pricingDetails.replies}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='label'>Communities:</label>
            <input
              type="text"
              name="communities"
              className="form-control"
              value={pricingDetails.communities}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* <div>        <div className='add-offer-container-main'>
        <label className='label'>Add Column: </label>
        <div className="add-offer-container">
          <input
            type="text"
            value={newOffer}
            onChange={(e) => setNewOffer(e.target.value)}
            placeholder="Add new offer"
            className='add-col'
          />
          <button type="button" onClick={handleAddOffer}>+</button>
        </div>
        
        </div>
        {pricingDetails.offerList.map((offer) => (
          <div key={offer.id} className="offer-item">
            <input
              type="text"
              value={offer.text}
              onChange={(e) => handleEditOffer(offer.id, e.target.value)}
            />
            <button type="button" onClick={() => handleDeleteOffer(offer.id)}>-</button>
          </div>
        ))}

</div> */}

      <div className='add-button-group'>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type='button' className='btn-secondary' onClick={handleCancel}>Cancel</button>
      </div>
      </form>
    </div>
  )
}

export default UpdatePrice