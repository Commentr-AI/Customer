
// import React, { useState } from 'react';

// const Keywords = () => {
//   const [keyword, setKeyword] = useState('');
//   const [keywordsList, setKeywordsList] = useState([]);
//   const [isEditing, setIsEditing] = useState(false); // Tracks if editing is in progress
//   const [editIndex, setEditIndex] = useState(null); // Tracks the index of the keyword being edited

//   // Handle adding or updating a keyword
//   const handleAddKeyword = (e) => {
//     e.preventDefault();

//     if (keyword.trim()) {
//       if (isEditing) {
//         // Update the keyword if we are editing
//         const updatedKeywords = keywordsList.map((kw, index) =>
//           index === editIndex ? keyword.trim() : kw
//         );
//         setKeywordsList(updatedKeywords);
//         setIsEditing(false);
//         setEditIndex(null);
//       } else {
//         // Add the new keyword to the list
//         setKeywordsList([...keywordsList, keyword.trim()]);
//       }
//       setKeyword(''); // Clear the input after adding or editing
//     }
//   };

//   // Handle editing a keyword
//   const handleEdit = (index) => {
//     setKeyword(keywordsList[index]); // Pre-fill the input with the keyword to be edited
//     setIsEditing(true); // Set editing mode
//     setEditIndex(index); // Track the index being edited
//   };

//   // Handle deleting a keyword
//   const handleDelete = (index) => {
//     const updatedKeywords = keywordsList.filter((kw, i) => i !== index);
//     setKeywordsList(updatedKeywords); // Update the list by removing the selected keyword
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <form onSubmit={handleAddKeyword}>
//         <h3>{isEditing ? 'Edit Keyword' : 'Enter Keywords:'}</h3>
//         <div className='d-flex align-items-center justify-content-start'>
//           <input
//             type="text"
//             value={keyword}
//             onChange={(e) => setKeyword(e.target.value)}
//             placeholder="Enter Keyword"
//             style={{ padding: '10px', width: '300px' }}
//             className='form-control'
//           />
//           <button type='submit' className='btn btn-success m-3'>
//             {isEditing ? 'Update' : 'Add'}
//           </button>
//         </div>
//       </form>
      
//       <div style={{ marginTop: '20px', fontSize: '20px' }}>
//         <strong className=''>Keywords (Minimum 5)</strong> 
//         <div className='d-flex flex-column align-items-start justify-content-start gap-2 border border-2 border-secondary-subtle rounded mt-2 p-2' style={{minHeight:"250px"}}>
//           {keywordsList.map((kw, index) => (
//             <div className='border border-2 border-primary-subtle rounded px-3 py-1 w-50 d-flex align-items-center justify-content-between' key={index}>
//               <span className='w-75'>{kw}</span>
//               <div className='w-25 d-flex align-items-center justify-content-between'>
//                 <span onClick={() => handleEdit(index)}>
//                   <i className="bi bi-pencil-square text-primary ms-2 fs-6" style={{cursor:"pointer"}}></i>
//                 </span>
//                 <span onClick={() => handleDelete(index)}>
//                   <i className="bi bi-trash3 text-danger ms-2 fs-6" style={{cursor:"pointer"}}></i>
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Keywords;

import React, { useState } from 'react';

const Keywords = () => {
  const [keyword, setKeyword] = useState('');
  const [keywordsList, setKeywordsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // Tracks if editing is in progress
  const [editIndex, setEditIndex] = useState(null); // Tracks the index of the keyword being edited

  // Handle adding or updating a keyword
  const handleAddKeyword = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      if (isEditing) {
        // Update the keyword if we are editing
        const updatedKeywords = keywordsList.map((kw, index) =>
          index === editIndex ? keyword.trim() : kw
        );
        setKeywordsList(updatedKeywords);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        // Add the new keyword to the list
        setKeywordsList([...keywordsList, keyword.trim()]);
      }
      setKeyword(''); // Clear the input after adding or editing
    }
  };

  // Handle editing a keyword
  const handleEdit = (index) => {
    setKeyword(keywordsList[index]); // Pre-fill the input with the keyword to be edited
    setIsEditing(true); // Set editing mode
    setEditIndex(index); // Track the index being edited
  };

  // Handle deleting a keyword
  const handleDelete = (index) => {
    const updatedKeywords = keywordsList.filter((kw, i) => i !== index);
    setKeywordsList(updatedKeywords); // Update the list by removing the selected keyword
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleAddKeyword}>
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
          <button type='submit' className='btn btn-success m-3'>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
      
      {keywordsList.length > 0 && (
        <div className='mt-2'>
          <strong className='mb-2 fs-5'>Keywords (Minimum 5)</strong>
          <div className='border border-2 border-secondary-subtle rounded mt-2' style={{minHeight:"250px"}}>
          <table className="table table-striped mt-3 rou rounded table-responsive">
            <thead className="">
              <tr>
                <th className='col-1'>#</th>
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
