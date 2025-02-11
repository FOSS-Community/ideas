export const Card = ({ children, className = '' }) => {
    return (
      <div className={`rounded-xl ${className}`}>
        {children}
      </div>
    );
  };