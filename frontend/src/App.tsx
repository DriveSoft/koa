import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SignupForm } from '@/components/SignupForm/SignupForm';
import { TableUsers } from '@/components/TableUsers/TableUsers';
import { Button } from './components/ui/button';
import LoginFormContainer from './components/LoginForm/LoginFormContainer';
import { parseJwt } from './lib/utils';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '../src/__generated__/gql';

const AUTH = gql(/* GraphQL */ `
   query Me {
      me {
         accessToken
         user {
            id
            firstName
         }
      }
   }
`);

const LOGOUT_GDL = gql(/* GraphQL */ `
   mutation Logout {
      logout
   }
`);

function App() {
   const { loading, error, data, refetch } = useQuery(AUTH);
   const accessToken = data?.me?.accessToken;
   const userName = data?.me?.user.firstName;
   if (accessToken !== undefined) {
      console.log('parseJwt', parseJwt(accessToken));
      console.log('userName', userName);
   }

   const [logout] = useMutation(LOGOUT_GDL);

   const [openedDialog, setOpenedDialog] = useState<'LOGIN' | 'SIGNUP' | null>(null);

   const onObtainAccessToken = (accessToken: string) => {
      refetch();
      //setAccessToken(accessToken);
      setOpenedDialog(null);
   };

   const handleLogout = async () => {
      await logout();
      refetch();
   }

   return (
      <>
         <div className="flex justify-center items-center w-full h-screen">
            <div className="absolute top-0 right-0 p-1">
               {accessToken === undefined ? (
                  <Button onClick={() => setOpenedDialog('LOGIN')}>
                     Login to edit
                  </Button>
               ) : (
                  <div className="flex items-center gap-4">
                     <div>{`User: ${userName}`}</div>
                     <Button onClick={handleLogout}>Logout</Button>
                  </div>
               )}
            </div>

            <div className="p-1 basis-full sm:basis-1/2">
               <TableUsers />
            </div>

            <Dialog
               open={openedDialog === 'SIGNUP'}
               onOpenChange={(open) => (open ? setOpenedDialog('SIGNUP') : setOpenedDialog(null))}>
               <DialogContent>
                  <SignupForm onShowLoginForm={() => setOpenedDialog('LOGIN')} />
               </DialogContent>
            </Dialog>

            <Dialog
               open={openedDialog === 'LOGIN'}
               onOpenChange={(open) => (open ? setOpenedDialog('LOGIN') : setOpenedDialog(null))}>
               <DialogContent>
                  <LoginFormContainer
                     onShowSignupForm={() => setOpenedDialog('SIGNUP')}
                     onObtainAccessToken={onObtainAccessToken}
                  />
               </DialogContent>
            </Dialog>
         </div>
      </>
   );
}

export default App;
