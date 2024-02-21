import React from 'react';

interface EmptyStateProps {
  illustration?: React.ReactNode;
  heading?: string;
  description: string;
  actions?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ illustration, heading, description, actions }) => {
  return (
    <div className="empty-state">
      {illustration &&
        <div className="illustration">
          {illustration}
        </div>
      }
      {heading &&
        <h3>{heading}</h3>
      }
      <p>{description}</p>
      {actions &&
        <div className="actions">
          {actions}
        </div>
      }
    </div>
  );
};

export default EmptyState;
