import React from 'react';

interface GoodsBadgesProps {
  badges?: string[];
}

const badgeStyle = {
  display: 'flex',
  gap: '6px',
  padding: '0 15px',
  marginTop: 10,
  marginBottom: 10,
};

const badgeItemStyle = {
  background: 'rgb(240, 241, 244)',
  color: 'rgb(233, 82, 148)',
  fontWeight: 400,
  fontSize: '10px',
  padding: '1px 4px 0 4px',
  borderRadius: '4px',
  lineHeight: '16px',
};

const GoodsBadges: React.FC<GoodsBadgesProps> = ({ badges = ["오늘드림", "BEST"] }) => (
  <div style={badgeStyle}>
    {badges.map((badge, index) => (
      <span 
        key={index} 
        style={{
          ...badgeItemStyle, 
          color: index === 0 ? 'rgb(233, 82, 148)' : '#868B94'
        }}
      >
        {badge}
      </span>
    ))}
  </div>
);

export default GoodsBadges; 