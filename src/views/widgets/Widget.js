// import React from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

// import { CRow, CCol, CWidgetStatsA } from '@coreui/react'

// const linkStyle = {
//   textDecoration: 'none', // Remove underline
//   color: 'inherit', // Inherit text color
// }

// const Widget = (props) => {
//   const selectRoute = (id) => {
//     if (id === 1) {
//       return 'customer-service'
//     } else if (id === 2) {
//       return 'appointment-booking'
//     } else if (id === 3) {
//       return 'resume-screening'
//     }
//   }

//   return (
//     <CRow className={props.className} xs={{ gutter: 4 }} style={{ display: 'inline-flex' }}>
//       {props.allAgents &&
//         props.allAgents.map((item) => (
//           <CCol
//             sm={6}
//             xl={4}
//             xxl={3}
//             key={item.id}
//             onClick={(event) => {
//               props.addAgent(item)
//             }}
//           >
//             <Link style={linkStyle}>
//               <CWidgetStatsA color={item.color} style={{ height: '120px' }} />
//               <p style={{ marginTop: '5px' }}>{item.name}</p>
//             </Link>
//           </CCol>
//         ))}

//       {props.activeAgents &&
//         props.activeAgents.map((item) => (
//           <CCol
//             sm={6}
//             xl={4}
//             xxl={3}
//             key={item.id}
//             onClick={(event) => {
//               //   props.addAgent(item)
//             }}
//           >
//             <Link to={`/apps/${selectRoute(item.id)}`} style={linkStyle}>
//               <CWidgetStatsA color={item.color} style={{ height: '120px' }} />
//               <p style={{ marginTop: '5px' }}>{item.name}</p>
//             </Link>
//           </CCol>
//         ))}
//     </CRow>
//   )
// }

// Widget.propTypes = {
//   className: PropTypes.string,
// }

// export default Widget
