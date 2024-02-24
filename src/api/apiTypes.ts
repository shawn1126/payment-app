export type LoginInputType = {
  userEmail?: string;
  password?: string;
};

export type LoginOutputType = {
  message: string;
  userData: {
    UUID: string;
    Email: string;
    Points: string;
    Phonenumber: string;
    UserName: string;
    friends: Array<FriendOutputType>;
    Walletaddress: {
      tron: string;
      ethereum: string;
      bnb: string;
      solana: string;
      polygon: string;
      avalanche: string;
      optimism: string;
    };
  };
};
export type FriendInputType = {
  owneruuid: string;
  frienduuid: string;
  friendname: string;
};

export type FriendOutputType = {
  name: string;
  uuid: string;
};

export type AddFriendOutputType = {
  message: string;
  friendList: Array<FriendOutputType>;
};

export type RegisterInputType = {
  email?: string;
  password1?: string;
  password2?: string;
  paymentPassword?: string;
  phonenumber?: string;
  username?: string;
};

export type RegisterOutputType = {
  message: string;
  uuid: string;
};

export type forgotEmailPassInputType = {
  email?: string;
  uuid?: string;
};

export type forgotEmailPassOutputType = {
  message: string;
};
export type emailPassVerifyInputType = {
  uuid?: string;
  verification_code?: string;
  email?: string;
};

export type emailPassVerifyOutputType = {
  message: string;
};

export type resetPassInputType = {
  newpassword1?: string;
  newpassword2?: string;
  email?: string;
  verification_code: string;
};

export type resetPassOutputType = {
  message: string;
  changedata?: {
    writeTime: {
      seconds: string;
      nanoseconds: string;
    };
  };
};

export type GoogleSignupType = {
  email: string;
  paymentPassword: string;
  username: string;
  phonenumber: string;
};

export type createNewPaymentPasswordInputType = {
  uuid: string;
  newpaymentpassword1: string;
  newpaymentpassword2: string;
  email_verification_code: string;
  phone_verification_code: string;
};

export type transferPointsInputType = {
  from_uuid: string;
  to_uuid: string;
  amount_points: string;
  paymentpassword: string;
};

export type resetNewPhoneNoInputType = {
  phonenumber: string;
  uuid: string;
  email_verification_code: string;
  phone_verification_code: string;
};
export type phoneNoSMSVerificationInputType = {
  newphonenumber: string;
  uuid: string;
};
export type phoneNoEmailVerificationInputType = {
  uuid: string;
};
export type resetOldEmailVerify = {
  uuid: string;
};

export type TxType = {
  Amount: number;
  From: string;
  From_address: string;
  Network: string;
  Status: string;
  Timestamp: string;
  To: string;
  To_address: string;
  Txid: string;
  Type: "TransferIn" | "TransferOut";
};
