/**Async */
export interface SignUpArgs {
    name: string
    email: string
    password: string
  };
  
  export interface SignUpRes {
    data: {
      user: {
          email: string
      }
    }
  };

  // type for itialState
export interface SingUpInitialState {

    isLoading: boolean
    isSignUp: boolean
    message: string
    email: string
    userName: string
   
};

export interface ActionSignUp {

    operation: string
    data: string
  
  };