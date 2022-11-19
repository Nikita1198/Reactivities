import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export function ValidationErrors ({errors}:Props) {
  return (
    <Message error>
        {errors && (
            <Message.List>
                {errors.map((err:any, i: any)=>(
                    <Message.Item ket={i}>{err}</Message.Item>
                ))}
            </Message.List>
        )}
    </Message>
  );
}
