import React from 'react';

export default function Warning({ alerts }) {
  if (alerts.isSuccess) {
    return (
      <h4 className="alert alert-success text-center mb-0">
        {alerts.isSuccess && alerts.alertMsg}
      </h4>
    );
  }

  if (alerts.isError) {
    return (
      <h4 className="alert alert-danger text-center mb-0">
        {alerts.isError && alerts.alertMsg}
      </h4>
    );
  }

  return (
    <h4 className="alert alert-warning text-center mb-0">
      {alerts.isEmpty && alerts.alertMsg}
      {alerts.isLoading && alerts.alertMsg}
    </h4>
  );
}
