import React, { useState,useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { setCredentials } from '../../app/features/auth/authSlice';
import axios from 'axios';


const Keywords = () => {
  const [keyword, setKeyword] = useState('');
  const [keywordsList, setKeywordsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Tracks if editing is in progress
  const [editIndex, setEditIndex] = useState(null);
  const [maxKeywords,setMaxKeywords] = useState(0) ;
  const dispatch = useDispatch()
  // Tracks the index of the keyword being edited

  const {userInfo} = useSelector(state=>state.auth)
  const keywords = userInfo.keywords
  // console.log(userInfo)

  useEffect(() => {
    if (userInfo?.plan?.keywords) {
      setMaxKeywords(userInfo.plan.keywords);
       setKeywordsList(userInfo.keywords); // Load keywords from user info
    }
  }, [userInfo]);

  // Handle adding or updating a keyword
  const handleAddKeyword =async (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/addkeyword`,{keyword: keyword},{withCredentials: true},)
      setKeywordsList([...keywordsList,keyword])
      
      dispatch(setCredentials({...response.data.user}))
      // console.log(keywords)
    //  console.log(keywords)
    // console.log(response.data)
    setKeyword('')
    
  };
}

const handleUpdate = async(e) =>{
  e.preventDefault();
  if (keyword.trim()) {
    //console.log("Update Keyword ")
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/editkeyword`,{oldKeyword: userInfo.keywords[editIndex], newKeyword: keyword},{withCredentials: true})
    dispatch(setCredentials({...response.data.user}))
    const updatedList = [...keywordsList]

    updatedList[editIndex]= keyword
    setKeywordsList(updatedList)
    setIsEditing(false)
    setKeyword('')
  
  };
}

  // Handle editing a keyword
  const handleEdit = async (index) => {
    setKeyword(keywordsList[index]); // Pre-fill the input with the keyword to be edited
    setIsEditing(true); // Set editing mode
    setEditIndex(index); 
 };

  // Handle deleting a keyword
  const handleDelete = async (index) => {

    const keywordValue = keywordsList[index]

    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/users/deleteKeyword`,{
      data: {
        keyword: keywordValue
      },
      withCredentials: true
    })
    
    setKeywordsList(keywordsList.filter(item=>item != keywordValue))
    // console.log(response)
    dispatch(setCredentials({...response.data.user}))
    setIsEditing(false);
    setKeyword('')
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={isEditing ? handleUpdate :handleAddKeyword}>
        <h3>{isEditing ? 'Edit Keyword' : 'Enter Keywords:'}</h3>
        <div className='d-flex align-items-center justify-content-start'>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter Keyword"
            style={{ padding: '10px', width: '300px' }}
            className='form-control'
          />
          <button type='submit' className={`btn ${isEditing ? "btn-success px-4 py-2 text-white" :"btn-primary px-5 py-2" } m-3`} disabled={isEditing ? false : keywordsList.length == maxKeywords}>
            {isEditing ? 'Update' : 'Add'}
          </button>

        </div>
      </form>
      
      {keywordsList.length > 0 && (
        <div className='mt-2'>
          <strong className='mb-2 fs-5'>{`Keywords (Maximum ${maxKeywords})`}</strong>
          <div className='border border-2 border-secondary-subtle rounded mt-2' style={{minHeight:"250px"}}>
          <table className="table table-striped mt-3 rou rounded table-responsive">
            <thead className="">
              <tr>
                <th className='col-1'>S.No</th>
                <th className='col-8'>Keyword</th>
                <th className='col-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {keywordsList.map((kw, index) => (
                <tr key={index}>
                  <td className=''>{index + 1}</td>
                  <td className='w-50'>{kw}</td>
                  <td className="d-flex align-items-center justify-content-center">
                    <i
                      className="bi bi-pencil-square text-primary fs-5 mx-2 "
                      onClick={() => handleEdit(index)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                    <i
                      className="bi bi-trash3 text-danger fs-5 mx-3"
                      onClick={() => handleDelete(index)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Keywords;