import React from 'react';

const storeSearchBtnContainerStyle: React.CSSProperties = {
    padding: '0 15px',
    marginTop: 30,
    marginBottom: 20,
  };

const storeSearchBtnStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    fontSize: 14,
    height: '42px',
    color: 'rgb(80, 88, 95)',
    fontWeight: 400,
    letterSpacing: -0.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  

  
  const StoreSearchBtn = () => (
    <div style={storeSearchBtnContainerStyle}>
        <button style={storeSearchBtnStyle}>
            구매 가능 올영매장 찾기
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6.83007 11.8801L6.07007 11.0901L10.3101 6.9901L6.07007 2.8901L6.83007 2.1001L11.8901 6.9901L6.83007 11.8801Z' fill='#99A1A8'/>
            </svg>
        </button>
    </div>
  );
  
  export default StoreSearchBtn; 