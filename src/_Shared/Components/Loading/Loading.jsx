// ====================================================== LOADING loai 1 ====================================================
// import React from 'react';
// import { ClipLoader } from 'react-spinners';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div style={overlayStyle}>
//       <ClipLoader color="#3498db" size={150} />
//     </div>
//   );
// };

// const overlayStyle = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   zIndex: 9999,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// };

// export default Loading;

// ====================================================== LOADING loai 2 ====================================================
// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <svg className="svg-spinner" viewBox="0 0 50 50">
//         <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
//       </svg>
//     </div>
//   );
// };

// export default Loading;

// ====================================================== LOADING loai 3 ====================================================
import React from 'react';

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="custom-loading-overlay">
      <svg className="multi-svg-spinner" viewBox="0 0 50 50">
        <circle className="path path1" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        <circle className="path path2" cx="25" cy="25" r="15" fill="none" strokeWidth="3"></circle>
        <circle className="path path3" cx="25" cy="25" r="10" fill="none" strokeWidth="2"></circle>
      </svg>
    </div>
  );
};

export default Loading;

// ====================================================== LOADING loai 4 ====================================================
// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <div className="gradient-spinner"></div>
//     </div>
//   );
// };

// export default Loading;

// ====================================================== LOADING loai 5 ====================================================

// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <div className="cube-container">
//         <div className="cube">
//           <div className="face face1"></div>
//           <div className="face face2"></div>
//           <div className="face face3"></div>
//           <div className="face face4"></div>
//           <div className="face face5"></div>
//           <div className="face face6"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loading;


// ====================================================== LOADING loai 6 ====================================================
// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <div className="spiral-loader"></div>
//     </div>
//   );
// };

// export default Loading;

// ====================================================== LOADING loai 7 ====================================================
// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <div className="loading-sphere"></div>
//     </div>
//   );
// };

// export default Loading;

// ====================================================== LOADING loai 8 ====================================================
// import React from 'react';

// const Loading = ({ isLoading }) => {
//   if (!isLoading) return null;

//   return (
//     <div className="custom-loading-overlay">
//       <div className="loading-pyramid"></div>
//     </div>
//   );
// };

// export default Loading;
