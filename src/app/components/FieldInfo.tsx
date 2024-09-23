import { Text } from '@chakra-ui/react';
import { FieldApi } from '@tanstack/react-form';

const FieldInfo = ({ field }: { field: FieldApi<any, any, any, any> }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <Text color="red.400" fontSize="sm" mt={1}>
          {field.state.meta.errors.join(', ')}
        </Text>
      ) : null}
      {field.state.meta.isValidating ? 'Validando...' : null}
    </>
  );
};

export default FieldInfo;
