import React from 'react';
import { LoginForm } from './LoginForm';
import { useMutation } from '@apollo/client';
import { gql } from '@/__generated__/gql';

const LOGIN = gql(/* GraphQL */ `
   mutation Mutation($password: String!, $email: String!) {
      login(password: $password, email: $email) {
         accessToken
      }
   }
`);

interface LoginFormContainerProps extends React.ComponentPropsWithoutRef<'div'> {
   onObtainAccessToken: (accessToken: string) => void;
   onShowSignupForm: () => void;
}

export default function LoginFormContainer({
   onObtainAccessToken,
   onShowSignupForm,
   ...props
}: LoginFormContainerProps) {
   const [login, { data, loading, error }] = useMutation(LOGIN);

   const onSubmitLogin = async ({
      email,
      password,
   }: {
      email: string | null;
      password: string | null;
   }) => {
      if (email === null || password === null) return;
      const result = await login({
         variables: {
            email: email,
            password,
         },
      });

      if (!result.data?.login.accessToken) return;

      onObtainAccessToken(result.data?.login.accessToken);
   };

   return (
      <LoginForm onSubmitLogin={onSubmitLogin} onShowSignupForm={onShowSignupForm} {...props} />
   );
}
