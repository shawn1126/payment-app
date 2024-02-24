import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { LoginOutputType } from "api/apiTypes";
import { doc, onSnapshot } from "firebase/firestore";
import router from "routes";
import { useAuthStore } from "store/authStore";
import { useTransferStore } from "store/transferStore";

import { AuthLanguageSelector } from "components/authentication";

import { db } from "../firebaseConfig";

const App = () => {
  const userEmailAndUid = useAuthStore((state) => state.userEmailAndUid);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  // const setIsLoading = useGlobalStore((state) => state.setIsLoading);
  const setUserEmailAndUid = useAuthStore((state) => state.setUserEmailAndUid);
  const setTxHistory = useTransferStore((state) => state.setTxHistory);

  useEffect(() => {
    console.log("entered useeffect");
    let unsub, unsub2;
    if (userEmailAndUid?.uid) {
      // setIsLoading(true);
      unsub = onSnapshot(
        doc(db, "zombie_wallet", userEmailAndUid.uid),
        (doc) => {
          const user = doc.data();
          console.log("user", user);

          const networks = {
            tron: user.Walletaddress.TRC20addresses as string,
            ethereum: user.Walletaddress.ERC20addresses as string,
            bnb: user.Walletaddress.BEP20addresses as string,
            solana: user.Walletaddress.SolanaAddresses as string,
            polygon: user.Walletaddress.PolygonAddresses as string,
            avalanche: user.Walletaddress.AVAXAddresses as string,
            optimism: user.Walletaddress.OptimismAddresses as string,
          };

          const _user: LoginOutputType["userData"] = {
            UUID: user?.UUID,
            Email: user?.Email,
            Walletaddress: networks,
            UserName: user?.UserName,
            Phonenumber: user?.Phonenumber,
            Points: user?.Points,
            friends: user?.friends,
          };
          setUser(_user);
        },
      );

      unsub2 = onSnapshot(doc(db, "Records", userEmailAndUid.uid), (doc) => {
        const transactions = doc.data();
        console.log("transactions", transactions);
        const transactionsList = [];
        transactions?.TransferIn?.forEach((transaction) => {
          transactionsList.push(transaction);
        });
        transactions?.TransferOut?.forEach((transaction) => {
          transactionsList.push(transaction);
        });

        setTxHistory(transactionsList);
      });
    } else if (user && !userEmailAndUid?.email && !userEmailAndUid?.uid) {
      setUser(null);
    }
    return () => {
      unsub && unsub();
      unsub2 && unsub2();
    };
  }, [userEmailAndUid]);

  useEffect(() => {
    if (!userEmailAndUid?.uid && user) {
      setUser(null);
    }
  }, [userEmailAndUid, user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && !userEmailAndUid?.email && !userEmailAndUid?.uid) {
      setUserEmailAndUid(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <AuthLanguageSelector />
    </>
  );
};

export default App;

// AVAXAddresses
// "0x5878dbC883A6C40552C40728c187377eDb308541"
// (字串)

// BEP20addresses
// "0xDA852eA532CD0B0F28C022cA0d068c9616918f50"
// (字串)

// ERC20addresses
// "0x3ccDd139c08770A20F45822eE9d34ce1e859a5D8"
// (字串)

// OptimismAddresses
// "0xae1Fe4fE1Fa57A8a1B132A24460dE2DBbcF3A67b"
// (字串)

// PolygonAddresses
// "0xb9AA5d0FFE1cE8ef7284Cd9F50D1a5dF8C4BF6E7"
// (字串)

// SolanaAddresses
// "DYSAy9Kw3V8Lse9bBCrcnqXi7u9A3ky2h9QqJN2PnyHq"
// (字串)

// TRC20addresses
// "TVAJ8XBMEUTjtc9feAMoSb1nRctawiFTrL"
// (
