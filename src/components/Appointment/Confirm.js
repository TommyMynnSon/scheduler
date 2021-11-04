import React, { useState } from 'react';

import Button from 'components/Button';

const Confirm = props => {

  const { message, destroy, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={destroy}>Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;