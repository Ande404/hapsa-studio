import React from 'react'
import { ChakraContainer } from '../components/atoms/Container'
import Nav from '../components/Nav'
import nookies from "nookies"
import { firebaseAdmin } from '../lib/firebase-admin';

export async function getServerSideProps(ctx) {
    try {
      const cookies = nookies.get(ctx);
      const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  
      return {
        props: {
          user,
        },
      };
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }
  }

const recruiter = () => {
    return (
        <div>
            <Nav/>
            <ChakraContainer>
            recruiter page
            </ChakraContainer>
       
        </div>
    )
}

export default recruiter
